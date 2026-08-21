import { NextResponse } from "next/server";

/**
 * Waitlist endpoint. Currently validates and logs; wire `persist()` to your
 * CRM / mailing list / database (Resend, Loops, Supabase, Airtable…).
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function persist(email: string) {
  // TODO: replace with a real destination.
  console.log(`[waitlist] ${new Date().toISOString()} ${email}`);
}

export async function POST(req: Request) {
  let email: unknown;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  await persist(email.trim().toLowerCase());
  return NextResponse.json({ ok: true });
}
