import { NextRequest, NextResponse } from "next/server";
import { verifyRequestAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  if (!verifyRequestAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const submissions = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
    return NextResponse.json(submissions);
  } catch {
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}
