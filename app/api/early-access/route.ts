import { NextResponse } from "next/server";
import { desc, eq, sql } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { GATE_COOKIE, gateToken, reviewPassword } from "@/lib/gate";
import { notifyNewApplication } from "@/lib/email";
import { lineStatus, newRefCode, refCodeExists } from "@/lib/line";
import { QUESTIONS } from "@/content/earlyAccess";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE = /^[a-z0-9]{4,12}$/;

export type Submission = {
  id: string;
  at: string;
  email: string;
  answers: Record<string, string | string[]>;
  wish: string;
  refCode: string;
  referredBy: string | null;
  referrals: number;
};

/** Record one application. A repeat from the same email updates it and keeps its place and code. */
export async function POST(req: Request) {
  let body: { email?: unknown; answers?: Record<string, unknown>; wish?: unknown; ref?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL.test(email) || email.length > 254) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

  const answers: Submission["answers"] = {};
  for (const q of QUESTIONS) {
    const v = body.answers?.[q.id];
    if (q.type === "single" && typeof v === "string" && q.options.includes(v)) answers[q.id] = v;
    if (q.type === "multi" && Array.isArray(v)) answers[q.id] = v.filter((x): x is string => typeof x === "string" && q.options.includes(x));
  }
  const wish = typeof body.wish === "string" ? body.wish.slice(0, 1000) : "";
  const ref = typeof body.ref === "string" && CODE.test(body.ref.toLowerCase()) ? body.ref.toLowerCase() : null;
  const refCode = newRefCode();
  const row = { email, answers, wish, refCode, userAgent: req.headers.get("user-agent")?.slice(0, 500) ?? null, referer: req.headers.get("referer")?.slice(0, 500) ?? null };

  try {
    const t = schema.earlyAccessApplications;
    // Only credit a referral that points at a real code and isn't the applicant's own.
    const referredBy = ref && (await refCodeExists(ref)) ? ref : null;

    const [saved] = await db
      .insert(t)
      .values({ ...row, referredBy })
      // On update: keep the original ref_code and referred_by; refresh the answers.
      .onConflictDoUpdate({ target: t.email, set: { answers: row.answers, wish: row.wish, userAgent: row.userAgent, referer: row.referer, updatedAt: sql`now()` } })
      .returning({ id: t.id, createdAt: t.createdAt, updatedAt: t.updatedAt, refCode: t.refCode, referredBy: t.referredBy });

    if (saved.referredBy === saved.refCode) {
      await db.update(t).set({ referredBy: null }).where(eq(t.id, saved.id));
      saved.referredBy = null;
    }

    const isUpdate = saved.updatedAt.getTime() - saved.createdAt.getTime() > 1000;
    await notifyNewApplication({ id: saved.id, email, answers, wish, isUpdate, referredBy: saved.referredBy }).catch((e) => console.error("[email]", e));

    if (process.env.EARLY_ACCESS_WEBHOOK_URL) {
      fetch(process.env.EARLY_ACCESS_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: saved.id, ...row, referredBy: saved.referredBy }) }).catch(() => {});
    }
    const status = await lineStatus(email);
    return NextResponse.json({ ok: true, id: saved.id, ...status });
  } catch (e) {
    console.error("[early-access] insert failed", e);
    return NextResponse.json({ error: "Could not save right now" }, { status: 500 });
  }
}

/**
 * GET ?code=xxxx  -> public line status for one applicant (position, referrals). Nothing personal is returned.
 * GET            -> full list, only for holders of the review cookie.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code")?.toLowerCase();
  if (code) {
    if (!CODE.test(code)) return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    const t = schema.earlyAccessApplications;
    const [row] = await db.select({ email: t.email }).from(t).where(eq(t.refCode, code)).limit(1);
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const status = await lineStatus(row.email);
    return NextResponse.json(status);
  }

  const cookie = req.headers.get("cookie")?.match(new RegExp(`${GATE_COOKIE}=([a-f0-9]+)`))?.[1];
  if (!cookie || cookie !== (await gateToken(reviewPassword()))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await db.select().from(schema.earlyAccessApplications).orderBy(desc(schema.earlyAccessApplications.createdAt)).limit(5000);
  const counts = new Map<string, number>();
  for (const r of rows) if (r.referredBy) counts.set(r.referredBy, (counts.get(r.referredBy) ?? 0) + 1);
  const items: Submission[] = rows.map((r) => ({ id: r.id, at: r.createdAt.toISOString(), email: r.email, answers: r.answers, wish: r.wish, refCode: r.refCode, referredBy: r.referredBy, referrals: counts.get(r.refCode) ?? 0 }));
  return NextResponse.json({ items });
}
