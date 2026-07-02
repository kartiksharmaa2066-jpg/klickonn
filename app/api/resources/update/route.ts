import { NextRequest, NextResponse } from "next/server";
import { verifyRequestAuth, sanitizeInput, isValidId } from "@/lib/auth";
import { db } from "@/lib/db";
import { resources } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(request: NextRequest) {
  if (!verifyRequestAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, category, description, content, imageUrl, pdfUrl, readTime, published, featured } = body;

    if (!id || !isValidId(String(id))) {
      return NextResponse.json({ error: "Valid resource ID is required" }, { status: 400 });
    }

    const existing = await db.select().from(resources).where(eq(resources.id, id));
    if (existing.length === 0) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (title !== undefined) updates.title = sanitizeInput(String(title), 200);
    if (category !== undefined) updates.category = sanitizeInput(String(category), 50);
    if (description !== undefined) updates.description = sanitizeInput(String(description), 1000);
    if (content !== undefined) updates.content = content ? sanitizeInput(String(content), 50000) : null;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl || null;
    if (pdfUrl !== undefined) updates.pdfUrl = pdfUrl || null;
    if (readTime !== undefined) updates.readTime = readTime ? sanitizeInput(String(readTime), 50) : null;
    if (published !== undefined) updates.published = published;
    if (featured !== undefined) updates.featured = featured;

    await db.update(resources).set(updates).where(eq(resources.id, id));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update resource" },
      { status: 500 }
    );
  }
}
