CREATE TABLE "probes" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"service_id" text NOT NULL,
	"probed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ok" boolean NOT NULL,
	"status_code" integer,
	"method" text NOT NULL,
	"latency_ms" integer,
	"note" text
);
--> statement-breakpoint
CREATE TABLE "service_sources" (
	"service_id" text NOT NULL,
	"source" text NOT NULL,
	"source_url" text,
	"raw" jsonb,
	"seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "service_sources_service_id_source_pk" PRIMARY KEY("service_id","source")
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text,
	"endpoint" text NOT NULL,
	"rails" text[] NOT NULL,
	"chains" text[] NOT NULL,
	"assets" text[] NOT NULL,
	"price_display" text,
	"price_usd" numeric,
	"facilitator" text,
	"live" boolean,
	"last_seen_live" timestamp with time zone,
	"last_probed_at" timestamp with time zone,
	"delisted_at" timestamp with time zone,
	"first_indexed" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "submissions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"endpoint" text NOT NULL,
	"name" text,
	"contact" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"approved" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "probes" ADD CONSTRAINT "probes_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_sources" ADD CONSTRAINT "service_sources_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "probes_service_idx" ON "probes" USING btree ("service_id","probed_at");--> statement-breakpoint
CREATE INDEX "services_live_idx" ON "services" USING btree ("live");--> statement-breakpoint
CREATE INDEX "services_last_probed_idx" ON "services" USING btree ("last_probed_at");