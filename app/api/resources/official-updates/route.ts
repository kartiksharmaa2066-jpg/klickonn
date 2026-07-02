import { NextRequest, NextResponse } from "next/server";
import { verifyRequestAuth } from "@/lib/auth";
import {
  getOfficialUpdates,
  refreshOfficialUpdates,
} from "@/lib/official-updates";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const updates = await getOfficialUpdates(limit, category);
    return NextResponse.json(updates);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch updates" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!verifyRequestAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await refreshOfficialUpdates();
    return NextResponse.json({ success: true, ...result });
  } catch {
    return NextResponse.json(
      { error: "Refresh failed" },
      { status: 500 }
    );
  }
}
