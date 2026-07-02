import { NextRequest, NextResponse } from "next/server";
import { verifyRequestAuth, sanitizeInput } from "@/lib/auth";
import {
  getUpdateSources,
  addUpdateSource,
  toggleUpdateSource,
  deleteUpdateSource,
} from "@/lib/official-updates";

export async function GET() {
  try {
    const sources = await getUpdateSources();
    return NextResponse.json(sources);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch sources" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!verifyRequestAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, url, type, category } = body;

    if (!name || !url || !type || !category) {
      return NextResponse.json(
        { error: "Name, URL, type, and category are required" },
        { status: 400 }
      );
    }

    const safeName = sanitizeInput(String(name), 100);
    const safeUrl = sanitizeInput(String(url), 500);
    const safeType = sanitizeInput(String(type), 20);
    const safeCategory = sanitizeInput(String(category), 50);

    if (safeType !== "rss" && safeType !== "api") {
      return NextResponse.json(
        { error: "Type must be 'rss' or 'api'" },
        { status: 400 }
      );
    }

    try {
      new URL(safeUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    const result = await addUpdateSource({
      name: safeName,
      url: safeUrl,
      type: safeType,
      category: safeCategory,
    });

    return NextResponse.json({ success: true, source: result[0] });
  } catch {
    return NextResponse.json(
      { error: "Failed to add source" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyRequestAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, enabled } = body;

    if (!id || typeof enabled !== "boolean") {
      return NextResponse.json(
        { error: "ID and enabled flag are required" },
        { status: 400 }
      );
    }

    await toggleUpdateSource(id, enabled);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update source" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyRequestAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "", 10);

    if (isNaN(id) || id <= 0) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await deleteUpdateSource(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete source" },
      { status: 500 }
    );
  }
}
