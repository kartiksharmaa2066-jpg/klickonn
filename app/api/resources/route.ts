import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { resources } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all");

  if (all === "true") {
    const cookie = request.headers.get("cookie") || "";
    if (!cookie.includes("admin_auth=authenticated")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const rows = await db.select().from(resources).orderBy(desc(resources.createdAt));
    return NextResponse.json(rows);
  }

  const rows = await db
    .select()
    .from(resources)
    .where(eq(resources.published, true))
    .orderBy(desc(resources.createdAt));

  return NextResponse.json(rows);
}
