import { google, drive_v3 } from "googleapis";

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  size: string;
  webViewLink: string;
}

function getDriveClient(): drive_v3.Drive {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!email || !key) {
    throw new Error(
      "Google Drive credentials not configured. Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_KEY."
    );
  }

  const auth = new google.auth.JWT({
    email,
    key: key.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  return google.drive({ version: "v3", auth });
}

function getFolderId(): string {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!folderId) {
    throw new Error("GOOGLE_DRIVE_FOLDER_ID env var is not set");
  }
  return folderId;
}

export async function listPdfFiles(): Promise<DriveFile[]> {
  const drive = getDriveClient();
  const folderId = getFolderId();
  const files: DriveFile[] = [];
  let pageToken: string | undefined;

  do {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType = 'application/pdf' and trashed = false`,
      fields:
        "nextPageToken, files(id, name, mimeType, modifiedTime, size, webViewLink)",
      pageToken,
      orderBy: "name",
      pageSize: 100,
    });

    for (const file of res.data.files || []) {
      if (file.id && file.name && file.mimeType && file.modifiedTime) {
        files.push({
          id: file.id,
          name: file.name,
          mimeType: file.mimeType,
          modifiedTime: file.modifiedTime,
          size: file.size || "0",
          webViewLink: file.webViewLink || "",
        });
      }
    }

    pageToken = res.data.nextPageToken || undefined;
  } while (pageToken);

  return files;
}

export async function getFileMetadata(
  fileId: string
): Promise<DriveFile | null> {
  const drive = getDriveClient();

  try {
    const res = await drive.files.get({
      fileId,
      fields: "id, name, mimeType, modifiedTime, size, webViewLink",
    });

    const file = res.data;
    if (!file.id || !file.name || !file.mimeType || !file.modifiedTime) {
      return null;
    }

    return {
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      modifiedTime: file.modifiedTime,
      size: file.size || "0",
      webViewLink: file.webViewLink || "",
    };
  } catch {
    return null;
  }
}

export function getDirectDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export function getThumbnailUrl(fileId: string): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
}

export function cleanFileName(name: string): string {
  return name
    .replace(/\.pdf$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
