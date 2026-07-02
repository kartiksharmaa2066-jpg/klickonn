import { db } from "@/lib/db";
import { resources, syncLogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  listPdfFiles,
  getDirectDownloadUrl,
  getThumbnailUrl,
  cleanFileName,
} from "@/lib/google-drive";

interface SyncResult {
  status: "success" | "error";
  filesAdded: number;
  filesUpdated: number;
  filesDeleted: number;
  errorMessage?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function guessCategory(title: string): string {
  const lower = title.toLowerCase();
  if (/invest|sip|mutual|fund|etf|gold|silver|nps|ppf|fd|rd/.test(lower))
    return "Investment";
  if (/travel|flight|hotel|visa|tour|trip/.test(lower)) return "Travel";
  if (/insur|policy|claim/.test(lower)) return "Insurance";
  if (/tax|gst|income|return|filing/.test(lower)) return "Tax Planning";
  if (/retire|pension|annuity/.test(lower)) return "Retirement";
  return "General";
}

export async function runSync(): Promise<SyncResult> {
  let filesAdded = 0;
  let filesUpdated = 0;
  let filesDeleted = 0;

  try {
    const driveFiles = await listPdfFiles();
    const driveFileIds = new Set(driveFiles.map((f) => f.id));

    const existingSynced = await db
      .select()
      .from(resources)
      .where(eq(resources.source, "drive"));

    const existingByFileId = new Map(
      existingSynced.map((r) => [r.driveFileId, r])
    );

    for (const file of driveFiles) {
      const existing = existingByFileId.get(file.id);

      if (existing) {
        const driveModified = new Date(file.modifiedTime);
        const dbModified = existing.driveModifiedAt
          ? new Date(existing.driveModifiedAt)
          : new Date(0);

        if (driveModified > dbModified) {
          const title = cleanFileName(file.name);
          const category = guessCategory(title);

          await db
            .update(resources)
            .set({
              title,
              slug: slugify(title) + "-" + existing.id,
              category,
              pdfUrl: getDirectDownloadUrl(file.id),
              imageUrl: getThumbnailUrl(file.id),
              driveModifiedAt: new Date(file.modifiedTime),
              updatedAt: new Date(),
            })
            .where(eq(resources.id, existing.id));

          filesUpdated++;
        }
      } else {
        const title = cleanFileName(file.name);
        const category = guessCategory(title);
        let slug = slugify(title);

        const slugExists = await db
          .select({ id: resources.id })
          .from(resources)
          .where(eq(resources.slug, slug))
          .limit(1);

        if (slugExists.length > 0) {
          slug = `${slug}-${Date.now()}`;
        }

        await db.insert(resources).values({
          title,
          slug,
          category,
          description: `${title} - Document imported from Google Drive.`,
          pdfUrl: getDirectDownloadUrl(file.id),
          imageUrl: getThumbnailUrl(file.id),
          published: true,
          source: "drive",
          driveFileId: file.id,
          driveModifiedAt: new Date(file.modifiedTime),
        });

        filesAdded++;
      }
    }

    for (const existing of existingSynced) {
      if (existing.driveFileId && !driveFileIds.has(existing.driveFileId)) {
        await db
          .update(resources)
          .set({
            published: false,
            updatedAt: new Date(),
          })
          .where(eq(resources.id, existing.id));

        filesDeleted++;
      }
    }

    const result: SyncResult = {
      status: "success",
      filesAdded,
      filesUpdated,
      filesDeleted,
    };

    await db.insert(syncLogs).values({
      status: "success",
      filesAdded,
      filesUpdated,
      filesDeleted,
    });

    return result;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown sync error";

    const result: SyncResult = {
      status: "error",
      filesAdded,
      filesUpdated,
      filesDeleted,
      errorMessage,
    };

    await db.insert(syncLogs).values({
      status: "error",
      filesAdded,
      filesUpdated,
      filesDeleted,
      errorMessage,
    });

    return result;
  }
}

export async function getSyncLogs(limit = 20) {
  return db
    .select()
    .from(syncLogs)
    .orderBy(syncLogs.id)
    .limit(limit);
}

export async function getDriveFileCount(): Promise<number> {
  try {
    const files = await listPdfFiles();
    return files.length;
  } catch {
    return 0;
  }
}
