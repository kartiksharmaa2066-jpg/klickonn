CREATE TABLE "official_updates" (
	"id" serial PRIMARY KEY NOT NULL,
	"source_id" integer NOT NULL,
	"title" text NOT NULL,
	"summary" text,
	"source_url" text NOT NULL,
	"published_at" timestamp,
	"category" text NOT NULL,
	"guid" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "official_updates_guid_unique" UNIQUE("guid")
);
--> statement-breakpoint
CREATE TABLE "update_sources" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"type" text NOT NULL,
	"category" text NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"last_fetched_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
