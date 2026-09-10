import "server-only";
import { eq, sql } from "drizzle-orm";
import { db, schema } from "@/lib/db";

export const TOKEN_CONTRACT_KEY = "token_contract";

export async function getSetting(key: string): Promise<string | null> {
  try {
    const rows = await db.select({ value: schema.settings.value }).from(schema.settings).where(eq(schema.settings.key, key)).limit(1);
    return rows[0]?.value ?? null;
  } catch {
    return null; // settings table missing or DB down: fall back to static content
  }
}

export async function setSetting(key: string, value: string): Promise<void> {
  await db
    .insert(schema.settings)
    .values({ key, value })
    .onConflictDoUpdate({ target: schema.settings.key, set: { value: sql`excluded.value`, updatedAt: sql`now()` } });
}
