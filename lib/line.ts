import { asc, eq, sql } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { PLACES_PER_REFERRAL, POSITION_OFFSET } from "@/content/earlyAccess";

const ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789"; // no 0/o/1/l/i, easy to read aloud
export function newRefCode(len = 6) {
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

export type LineStatus = { code: string; position: number; referrals: number; total: number };

/**
 * Position in line = POSITION_OFFSET + sign-up order, minus PLACES_PER_REFERRAL per person who
 * joined through this applicant's link. Never below POSITION_OFFSET + 1.
 */
export async function lineStatus(email: string): Promise<LineStatus | null> {
  const t = schema.earlyAccessApplications;
  const rows = await db.select({ email: t.email, refCode: t.refCode, referredBy: t.referredBy }).from(t).orderBy(asc(t.createdAt), asc(t.id));
  const idx = rows.findIndex((r) => r.email === email);
  if (idx < 0) return null;
  const me = rows[idx];
  const referrals = rows.filter((r) => r.referredBy === me.refCode).length;
  return { code: me.refCode, position: POSITION_OFFSET + Math.max(1, idx + 1 - referrals * PLACES_PER_REFERRAL), referrals, total: rows.length };
}

export async function refCodeExists(code: string) {
  const t = schema.earlyAccessApplications;
  const [row] = await db.select({ n: sql<number>`1` }).from(t).where(eq(t.refCode, code)).limit(1);
  return Boolean(row);
}
