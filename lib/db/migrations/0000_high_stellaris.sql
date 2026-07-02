CREATE TABLE "contact_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"subject" text,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resources" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"category" text NOT NULL,
	"description" text NOT NULL,
	"content" text,
	"image_url" text,
	"pdf_url" text,
	"read_time" text,
	"published" boolean DEFAULT false NOT NULL,
	"source" text DEFAULT 'manual' NOT NULL,
	"drive_file_id" text,
	"drive_modified_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "resources_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "sync_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" text NOT NULL,
	"files_added" integer DEFAULT 0 NOT NULL,
	"files_updated" integer DEFAULT 0 NOT NULL,
	"files_deleted" integer DEFAULT 0 NOT NULL,
	"error_message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
