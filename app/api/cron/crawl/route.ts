import { NextResponse } from "next/server";
import { crawl, probeBatch } from "@/lib/directory/pipeline";
import { notifyCrawlFailure } from "@/lib/email";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

/**
 * Full pipeline: ingest -> normalize -> dedupe -> upsert -> probe a batch.
 * Invoked by Vercel Cron (daily backstop) and a GitHub Actions ping every 6h.
 * Auth: Vercel cron sends `Authorization: Bearer CRON_SECRET`; the GH ping uses ?key=.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = process.env.CRON_SECRET;
  const given = req.headers.get("authorization")?.replace("Bearer ", "") ?? url.searchParams.get("key");
  if (secret && given !== secret) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const probeOnly = url.searchParams.get("probe") === "only";
    const report = probeOnly ? null : await crawl();
    const probe = await probeBatch(Number(url.searchParams.get("batch") ?? 150), Number(url.searchParams.get("conc") ?? 12));

    // A run where every source failed is a stale-index emergency (briefing §8): alert the operator.
    if (report && report.sources.every((s) => s.error !== null || s.count === 0)) {
      await notifyCrawlFailure(report).catch(() => {});
    }
    console.log("[crawl]", JSON.stringify({ report, probe }));
    return NextResponse.json({ ok: true, report, probe });
  } catch (e) {
    console.error("[crawl] fatal", e);
    await notifyCrawlFailure({ fatal: e instanceof Error ? e.message : String(e) }).catch(() => {});
    return NextResponse.json({ error: "crawl failed" }, { status: 500 });
  }
}
