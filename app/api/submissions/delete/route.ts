import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  if (!cookie.includes("admin_auth=authenticated")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, Number(id)));

  return NextResponse.json({ success: true });
}
