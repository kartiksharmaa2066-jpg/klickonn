import { NextRequest, NextResponse } from "next/server";
import { verifyRequestAuth, sanitizeInput } from "@/lib/auth";
import { db } from "@/lib/db";
import { resources } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function POST(request: NextRequest) {
  if (!verifyRequestAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, category, description, content, imageUrl, pdfUrl, readTime, published, featured } = body;

    if (!title || !category || !description) {
      return NextResponse.json(
        { error: "Title, category, and description are required" },
        { status: 400 }
      );
    }

    const safeTitle = sanitizeInput(String(title), 200);
    const safeCategory = sanitizeInput(String(category), 50);
    const safeDescription = sanitizeInput(String(description), 1000);
    const safeContent = content ? sanitizeInput(String(content), 50000) : null;
    const safeReadTime = readTime ? sanitizeInput(String(readTime), 50) : null;

    let slug = slugify(safeTitle);
    const existing = await db.select().from(resources).where(eq(resources.slug, slug));
    if (existing.length > 0) {
      slug = `${slug}-${Date.now()}`;
    }

    const result = await db
      .insert(resources)
      .values({
        title: safeTitle,
        slug,
        category: safeCategory,
        description: safeDescription,
        content: safeContent,
        imageUrl: imageUrl || null,
        pdfUrl: pdfUrl || null,
        readTime: safeReadTime,
        published: published ?? false,
        featured: featured ?? false,
      })
      .returning();

    return NextResponse.json({ success: true, resource: result[0] });
  } catch {
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}
