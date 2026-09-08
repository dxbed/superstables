CREATE TABLE "early_access_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"answers" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"wish" text DEFAULT '' NOT NULL,
	"user_agent" text,
	"referer" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "early_access_applications_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "early_access_created_at_idx" ON "early_access_applications" USING btree ("created_at");