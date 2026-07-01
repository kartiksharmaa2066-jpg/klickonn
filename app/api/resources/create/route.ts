import { NextResponse } from "next/server";
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

export async function POST(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  if (!cookie.includes("admin_auth=authenticated")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, category, description, content, imageUrl, pdfUrl, readTime, published } = body;

    if (!title || !category || !description) {
      return NextResponse.json(
        { error: "Title, category, and description are required" },
        { status: 400 }
      );
    }

    let slug = slugify(title);
    const existing = await db.select().from(resources).where(eq(resources.slug, slug));
    if (existing.length > 0) {
      slug = `${slug}-${Date.now()}`;
    }

    const result = await db
      .insert(resources)
      .values({
        title,
        slug,
        category,
        description,
        content: content || null,
        imageUrl: imageUrl || null,
        pdfUrl: pdfUrl || null,
        readTime: readTime || null,
        published: published ?? false,
      })
      .returning();

    return NextResponse.json({ success: true, resource: result[0] });
  } catch (err) {
    console.error("Create resource error:", err);
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}
