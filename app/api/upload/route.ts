import { NextRequest, NextResponse } from "next/server";
import { verifyRequestAuth, isValidUploadFile, sanitizeFolderPath } from "@/lib/auth";
import { imagekit } from "@/lib/imagekit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!verifyRequestAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint || publicKey.startsWith("public_XXX")) {
    return NextResponse.json(
      { error: "ImageKit not configured" },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = sanitizeFolderPath((formData.get("folder") as string) || "resources");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const validation = isValidUploadFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await imagekit.upload({
      file: buffer,
      fileName: file.name.replace(/[^a-zA-Z0-9._-]/g, "_"),
      folder: `/${folder}`,
    });

    return NextResponse.json({ url: result.url, fileId: result.fileId });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
