import { NextRequest, NextResponse } from "next/server";
import { verifyRequestAuth, isValidId } from "@/lib/auth";
import { db } from "@/lib/db";
import { resources } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(request: NextRequest) {
  if (!verifyRequestAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!isValidId(id)) {
    return NextResponse.json({ error: "Valid resource ID is required" }, { status: 400 });
  }

  try {
    const result = await db.delete(resources).where(eq(resources.id, Number(id))).returning();
    if (result.length === 0) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete resource" }, { status: 500 });
  }
}
