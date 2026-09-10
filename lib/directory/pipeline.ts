import "server-only";
import { eq, isNull, or, sql } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { dedupe, type RawService } from "./normalize";
import { isProbeable, probeMany } from "./probe";
import { SOURCES, submissionToRaw } from "./sources";

export type CrawlReport = {
  startedAt: string;
  sources: { name: string; count: number; error: string | null }[];
  services: number;
  probed: number;
  live: number;
  ms: number;
};

/** Ingest every source (isolated failures), dedupe, upsert services + provenance. */
export async function crawl(): Promise<CrawlReport> {
  const t0 = Date.now();
  const report: CrawlReport = { startedAt: new Date().toISOString(), sources: [], services: 0, probed: 0, live: 0, ms: 0 };
  const raws: RawService[] = [];

  for (const s of SOURCES) {
    try {
      const items = await s.fetch();
      raws.push(...items);
      report.sources.push({ name: s.name, count: items.length, error: null });
    } catch (e) {
      report.sources.push({ name: s.name, count: 0, error: e instanceof Error ? e.message : String(e) });
    }
  }

  // Approved self-submissions flow through the same pipeline.
  try {
    const subs = await db.select().from(schema.submissions).where(eq(schema.submissions.approved, true));
    raws.push(...subs.map(submissionToRaw));
    report.sources.push({ name: "self-submitted", count: subs.length, error: null });
  } catch (e) {
    report.sources.push({ name: "self-submitted", count: 0, error: e instanceof Error ? e.message : String(e) });
  }

  const normalized = dedupe(raws);
  report.services = normalized.length;

  // Chunked batch upserts: the Bazaar alone is 16k+ resources; row-by-row would blow the function budget.
  const chunk = <T,>(xs: T[], n: number) => Array.from({ length: Math.ceil(xs.length / n) }, (_, i) => xs.slice(i * n, i * n + n));
  for (const batch of chunk(normalized, 200)) {
    await db
      .insert(schema.services)
      .values(batch.map((n) => ({ id: n.id, name: n.name, category: n.category, description: n.description, endpoint: n.endpoint, rails: n.rails, chains: n.chains, assets: n.assets, priceDisplay: n.priceDisplay, priceUsd: n.priceUsd == null ? null : String(n.priceUsd), facilitator: n.facilitator })))
      .onConflictDoUpdate({
        target: schema.services.id,
        set: {
          name: sql`excluded.name`, category: sql`excluded.category`, description: sql`excluded.description`, endpoint: sql`excluded.endpoint`,
          rails: sql`excluded.rails`, chains: sql`excluded.chains`, assets: sql`excluded.assets`,
          priceDisplay: sql`excluded.price_display`, priceUsd: sql`excluded.price_usd`, facilitator: sql`excluded.facilitator`,
          delistedAt: sql`null`, updatedAt: sql`now()`,
        },
      });
  }
  const allSources = normalized.flatMap((n) => n.sources.map((s) => ({ serviceId: n.id, source: s.source, sourceUrl: s.sourceUrl, raw: s.raw })));
  const seenPairs = new Set<string>();
  const uniqueSources = allSources.filter((s) => { const k = `${s.serviceId}\u0000${s.source}`; if (seenPairs.has(k)) return false; seenPairs.add(k); return true; });
  for (const batch of chunk(uniqueSources, 100)) {
    await db
      .insert(schema.serviceSources)
      .values(batch)
      .onConflictDoUpdate({ target: [schema.serviceSources.serviceId, schema.serviceSources.source], set: { sourceUrl: sql`excluded.source_url`, raw: sql`excluded.raw`, seenAt: sql`now()` } });
  }

  // Services absent from every source for >7 days: mark delisted, never delete (briefing §5.6).
  const seenIds = normalized.map((n) => n.id);
  if (seenIds.length > 0) {
    await db.execute(sql`
      update services set delisted_at = now()
      where delisted_at is null
        and id not in (select service_id from service_sources where seen_at > now() - interval '7 days')
        and id not in ${sql`(${sql.join(seenIds.map((i) => sql`${i}`), sql`, `)})`}
        and first_indexed < now() - interval '7 days'
    `);
  }

  report.ms = Date.now() - t0;
  return report;
}

/** Probe the stalest N probeable services and record history. */
export async function probeBatch(limit = 150, concurrency = 12): Promise<{ probed: number; live: number; ms: number }> {
  const t0 = Date.now();
  const t = schema.services;
  const rows = await db
    .select({ id: t.id, endpoint: t.endpoint })
    .from(t)
    .where(or(isNull(t.lastProbedAt), sql`${t.lastProbedAt} < now() - interval '3 hours'`))
    .orderBy(sql`${t.lastProbedAt} asc nulls first`)
    .limit(limit * 2);

  const probeable = rows.filter((r) => isProbeable(r.endpoint)).slice(0, limit);
  const skipped = rows.filter((r) => !isProbeable(r.endpoint));

  // Non-HTTP schemes: live stays null ("not yet probed"), but stamp lastProbedAt so they don't hog the queue.
  if (skipped.length > 0) {
    await db.execute(sql`update services set last_probed_at = now() where id in (${sql.join(skipped.map((s) => sql`${s.id}`), sql`, `)})`);
  }

  const results = await probeMany(probeable, concurrency);
  let live = 0;
  const entries = [...results.entries()];
  const chunk2 = <T,>(xs: T[], n: number) => Array.from({ length: Math.ceil(xs.length / n) }, (_, i) => xs.slice(i * n, i * n + n));
  for (const batch of chunk2(entries, 200)) {
    await db.insert(schema.probes).values(batch.map(([id, r]) => ({ serviceId: id, ok: r.ok, statusCode: r.statusCode, method: r.method, latencyMs: r.latencyMs, note: r.note })));
  }
  const liveIds = entries.filter(([, r]) => r.ok).map(([id]) => id);
  const deadIds = entries.filter(([, r]) => !r.ok).map(([id]) => id);
  live = liveIds.length;
  if (liveIds.length) await db.execute(sql`update services set live = true, last_probed_at = now(), last_seen_live = now() where id in (${sql.join(liveIds.map((i) => sql`${i}`), sql`, `)})`);
  if (deadIds.length) await db.execute(sql`update services set live = false, last_probed_at = now() where id in (${sql.join(deadIds.map((i) => sql`${i}`), sql`, `)})`);
  return { probed: probeable.length, live, ms: Date.now() - t0 };
}
