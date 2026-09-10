import type { MetadataRoute } from "next";
import { isNull } from "drizzle-orm";
import { db, schema } from "@/lib/db";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.superstables.com";
  const fixed: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/discover`, changeFrequency: "hourly", priority: 0.95 },
    { url: `${base}/early-access`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/submit`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/docs`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/pricing`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contract`, changeFrequency: "weekly", priority: 0.6 },
  ];
  try {
    const rows = await db.select({ id: schema.services.id, updatedAt: schema.services.updatedAt }).from(schema.services).where(isNull(schema.services.delistedAt)).limit(5000);
    return [...fixed, ...rows.map((r) => ({ url: `${base}/s/${r.id}`, lastModified: r.updatedAt, changeFrequency: "daily" as const, priority: 0.5 }))];
  } catch {
    return fixed;
  }
}
