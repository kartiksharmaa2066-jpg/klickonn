import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  content: text("content"),
  imageUrl: text("image_url"),
  pdfUrl: text("pdf_url"),
  readTime: text("read_time"),
  published: boolean("published").default(false).notNull(),
  featured: boolean("featured").default(false).notNull(),
  source: text("source").default("manual").notNull(),
  driveFileId: text("drive_file_id"),
  driveModifiedAt: timestamp("drive_modified_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const syncLogs = pgTable("sync_logs", {
  id: serial("id").primaryKey(),
  status: text("status").notNull(),
  filesAdded: integer("files_added").default(0).notNull(),
  filesUpdated: integer("files_updated").default(0).notNull(),
  filesDeleted: integer("files_deleted").default(0).notNull(),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const updateSources = pgTable("update_sources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  type: text("type").notNull(),
  category: text("category").notNull(),
  enabled: boolean("enabled").default(true).notNull(),
  lastFetchedAt: timestamp("last_fetched_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const officialUpdates = pgTable("official_updates", {
  id: serial("id").primaryKey(),
  sourceId: integer("source_id").notNull(),
  title: text("title").notNull(),
  summary: text("summary"),
  sourceUrl: text("source_url").notNull(),
  publishedAt: timestamp("published_at"),
  category: text("category").notNull(),
  guid: text("guid").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
