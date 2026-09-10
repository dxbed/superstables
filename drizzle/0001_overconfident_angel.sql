ALTER TABLE "early_access_applications" ADD COLUMN "ref_code" text NOT NULL;--> statement-breakpoint
ALTER TABLE "early_access_applications" ADD COLUMN "referred_by" text;--> statement-breakpoint
CREATE INDEX "early_access_referred_by_idx" ON "early_access_applications" USING btree ("referred_by");--> statement-breakpoint
ALTER TABLE "early_access_applications" ADD CONSTRAINT "early_access_applications_ref_code_unique" UNIQUE("ref_code");