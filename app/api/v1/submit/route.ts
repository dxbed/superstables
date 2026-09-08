import { NextResponse } from "next/server";
import { and, eq, gt, sql } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { probeOne } from "@/lib/directory/probe";
import { notifySubmission } from "@/lib/email";

export const dynamic = "force-dynamic";

/** Vendor self-submit -> moderation queue (submissions table). We probe immediately for the notification. */
export async function POST(req: Request) {
  let body: { endpoint?: unknown; name?: unknown; contact?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: { code: "invalid_json", message: "Body must be JSON." } }, { status: 400 });
  }
  const endpoint = typeof body.endpoint === "string" ? body.endpoint.trim().slice(0, 500) : "";
  if (!/^https?:\/\/[^\s]+\.[^\s]+/.test(endpoint)) return NextResponse.json({ error: { code: "invalid_endpoint", message: "endpoint must be an http(s) URL." } }, { status: 400 });
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 200) || null : null;
  const contact = typeof body.contact === "string" ? body.contact.trim().slice(0, 200) || null : null;

  // Idempotency: a repeated key (or the same endpoint within 24h) does not create a duplicate.
  const idemKey = req.headers.get("idempotency-key");
  const [dup] = await db
    .select({ id: schema.submissions.id })
    .from(schema.submissions)
    .where(and(eq(schema.submissions.endpoint, endpoint), gt(schema.submissions.createdAt, sql`now() - interval '24 hours'`)))
    .limit(1);
  if (dup) {
    return NextResponse.json({ ok: true, deduplicated: true }, { headers: idemKey ? { "Idempotency-Key": idemKey } : undefined });
  }
  await db.insert(schema.submissions).values({ endpoint, name, contact });
  const probe = await probeOne(endpoint).catch(() => null);
  await notifySubmission({ endpoint, name, contact, probe }).catch(() => {});
  return NextResponse.json({ ok: true }, { headers: idemKey ? { "Idempotency-Key": idemKey } : undefined });
}
