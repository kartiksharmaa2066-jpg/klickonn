import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { resources } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  if (!cookie.includes("admin_auth=authenticated")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, category, description, content, imageUrl, pdfUrl, readTime, published } = body;

    if (!id) {
      return NextResponse.json({ error: "Resource ID is required" }, { status: 400 });
    }

    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (title !== undefined) updates.title = title;
    if (category !== undefined) updates.category = category;
    if (description !== undefined) updates.description = description;
    if (content !== undefined) updates.content = content;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl;
    if (pdfUrl !== undefined) updates.pdfUrl = pdfUrl;
    if (readTime !== undefined) updates.readTime = readTime;
    if (published !== undefined) updates.published = published;

    await db.update(resources).set(updates).where(eq(resources.id, id));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update resource error:", err);
    return NextResponse.json(
      { error: "Failed to update resource" },
      { status: 500 }
    );
  }
}
