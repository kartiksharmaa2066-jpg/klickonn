import Parser from "rss-parser";
import { db } from "@/lib/db";
import { officialUpdates, updateSources } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "KlickONN-ResourceCenter/1.0",
  },
});

interface FetchedItem {
  title: string;
  summary: string;
  sourceUrl: string;
  publishedAt: Date | null;
  guid: string;
}

interface SyncResult {
  status: "success" | "error";
  added: number;
  skipped: number;
  errorMessage?: string;
}

function generateGuid(url: string, title: string): string {
  const raw = `${url}|${title}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `upd_${Math.abs(hash).toString(36)}`;
}

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 3) + "...";
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchRssFeed(url: string): Promise<FetchedItem[]> {
  const feed = await parser.parseURL(url);
  const items: FetchedItem[] = [];

  for (const item of feed.items || []) {
    if (!item.title || !item.link) continue;

    const summary = item.contentSnippet
      ? truncate(stripHtml(item.contentSnippet), 500)
      : item.content
        ? truncate(stripHtml(item.content), 500)
        : "";

    const publishedAt = item.pubDate
      ? new Date(item.pubDate)
      : item.isoDate
        ? new Date(item.isoDate)
        : null;

    const guid = item.guid || generateGuid(item.link, item.title);

    items.push({
      title: item.title.trim(),
      summary,
      sourceUrl: item.link,
      publishedAt,
      guid,
    });
  }

  return items;
}

async function fetchFromSource(
  source: { id: number; name: string; url: string; type: string; category: string }
): Promise<FetchedItem[]> {
  try {
    if (source.type === "rss") {
      return await fetchRssFeed(source.url);
    }
    return [];
  } catch {
    return [];
  }
}

export async function refreshOfficialUpdates(): Promise<SyncResult> {
  let added = 0;
  let skipped = 0;

  try {
    const sources = await db
      .select()
      .from(updateSources)
      .where(eq(updateSources.enabled, true));

    const existingGuids = new Set(
      (
        await db.select({ guid: officialUpdates.guid }).from(officialUpdates)
      ).map((r) => r.guid)
    );

    for (const source of sources) {
      const items = await fetchFromSource(source);

      for (const item of items) {
        if (existingGuids.has(item.guid)) {
          skipped++;
          continue;
        }

        await db.insert(officialUpdates).values({
          sourceId: source.id,
          title: item.title,
          summary: item.summary,
          sourceUrl: item.sourceUrl,
          publishedAt: item.publishedAt,
          category: source.category,
          guid: item.guid,
        });

        existingGuids.add(item.guid);
        added++;
      }

      await db
        .update(updateSources)
        .set({ lastFetchedAt: new Date() })
        .where(eq(updateSources.id, source.id));
    }

    return { status: "success", added, skipped };
  } catch (err) {
    return {
      status: "error",
      added,
      skipped,
      errorMessage: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export async function getOfficialUpdates(limit = 50, category?: string) {
  if (category && category !== "All") {
    return db
      .select()
      .from(officialUpdates)
      .where(eq(officialUpdates.category, category))
      .limit(limit);
  }

  return db.select().from(officialUpdates).limit(limit);
}

export async function getUpdateSources() {
  return db.select().from(updateSources);
}

export async function addUpdateSource(data: {
  name: string;
  url: string;
  type: string;
  category: string;
}) {
  return db.insert(updateSources).values(data).returning();
}

export async function toggleUpdateSource(id: number, enabled: boolean) {
  return db
    .update(updateSources)
    .set({ enabled })
    .where(eq(updateSources.id, id));
}

export async function deleteUpdateSource(id: number) {
  return db.delete(updateSources).where(eq(updateSources.id, id));
}
