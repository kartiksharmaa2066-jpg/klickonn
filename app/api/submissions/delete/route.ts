import { NextRequest, NextResponse } from "next/server";
import { verifyRequestAuth, isValidId } from "@/lib/auth";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(request: NextRequest) {
  if (!verifyRequestAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!isValidId(id)) {
    return NextResponse.json({ error: "Valid submission ID is required" }, { status: 400 });
  }

  try {
    const result = await db.delete(contactSubmissions).where(eq(contactSubmissions.id, Number(id))).returning();
    if (result.length === 0) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 });
  }
}
