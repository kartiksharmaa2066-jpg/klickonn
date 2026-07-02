import { NextRequest, NextResponse } from "next/server";
import { verifyRequestAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { resources } from "@/lib/db/schema";
import { desc, eq, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all");
  const featured = searchParams.get("featured");

  if (all === "true") {
    if (!verifyRequestAuth(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      const rows = await db.select().from(resources).orderBy(desc(resources.createdAt));
      return NextResponse.json(rows);
    } catch {
      return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
    }
  }

  if (featured === "true") {
    try {
      const rows = await db
        .select()
        .from(resources)
        .where(and(eq(resources.published, true), eq(resources.featured, true)))
        .orderBy(desc(resources.createdAt))
        .limit(5);
      return NextResponse.json(rows);
    } catch {
      return NextResponse.json({ error: "Failed to fetch featured resources" }, { status: 500 });
    }
  }

  try {
    const rows = await db
      .select()
      .from(resources)
      .where(eq(resources.published, true))
      .orderBy(desc(resources.createdAt));
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}
