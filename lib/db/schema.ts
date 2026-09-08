import { index, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * Early-access applications from /early-access.
 * One row per email: a repeat submission updates the answers and bumps updated_at.
 */
export const earlyAccessApplications = pgTable(
  "early_access_applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    answers: jsonb("answers").$type<Record<string, string | string[]>>().notNull().default({}),
    wish: text("wish").notNull().default(""),
    /** Short public code for the applicant's share link. */
    refCode: text("ref_code").notNull().unique(),
    /** ref_code of whoever referred this applicant, if any. */
    referredBy: text("referred_by"),
    userAgent: text("user_agent"),
    referer: text("referer"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("early_access_created_at_idx").on(t.createdAt), index("early_access_referred_by_idx").on(t.referredBy)]
);

export type EarlyAccessApplication = typeof earlyAccessApplications.$inferSelect;

/* ---------------- V0 directory: services index ---------------- */
import { bigserial, boolean, integer, numeric, primaryKey } from "drizzle-orm/pg-core";

/** One row per deduped service. Dedupe key: endpoint host (id = slug of it). */
export const services = pgTable(
  "services",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    category: text("category"),
    description: text("description"),
    endpoint: text("endpoint").notNull(),
    rails: text("rails").array().notNull(),
    chains: text("chains").array().notNull(),
    assets: text("assets").array().notNull(),
    priceDisplay: text("price_display"),
    priceUsd: numeric("price_usd"),
    facilitator: text("facilitator"),
    live: boolean("live"),
    lastSeenLive: timestamp("last_seen_live", { withTimezone: true }),
    lastProbedAt: timestamp("last_probed_at", { withTimezone: true }),
    delistedAt: timestamp("delisted_at", { withTimezone: true }),
    firstIndexed: timestamp("first_indexed", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("services_live_idx").on(t.live), index("services_last_probed_idx").on(t.lastProbedAt)]
);

export const serviceSources = pgTable(
  "service_sources",
  {
    serviceId: text("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
    source: text("source").notNull(),
    sourceUrl: text("source_url"),
    raw: jsonb("raw"),
    seenAt: timestamp("seen_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.serviceId, t.source] })]
);

export const probes = pgTable(
  "probes",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    serviceId: text("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
    probedAt: timestamp("probed_at", { withTimezone: true }).notNull().defaultNow(),
    ok: boolean("ok").notNull(),
    statusCode: integer("status_code"),
    method: text("method").notNull(),
    latencyMs: integer("latency_ms"),
    note: text("note"),
  },
  (t) => [index("probes_service_idx").on(t.serviceId, t.probedAt)]
);

export const submissions = pgTable("submissions", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  endpoint: text("endpoint").notNull(),
  name: text("name"),
  contact: text("contact"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  approved: boolean("approved").default(false),
});

/** Small key-value store for operator-editable site settings (e.g. the token contract address). */
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Service = typeof services.$inferSelect;
export type Probe = typeof probes.$inferSelect;
