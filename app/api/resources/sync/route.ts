import { NextRequest, NextResponse } from "next/server";
import { verifyRequestAuth } from "@/lib/auth";
import { runSync, getSyncLogs, getDriveFileCount } from "@/lib/sync-engine";

export async function POST(request: NextRequest) {
  if (!verifyRequestAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runSync();
    return NextResponse.json({ success: true, ...result });
  } catch {
    return NextResponse.json(
      { error: "Sync failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  if (!verifyRequestAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [logs, driveCount] = await Promise.all([
      getSyncLogs(10),
      getDriveFileCount(),
    ]);

    const lastSync = logs.length > 0 ? logs[logs.length - 1] : null;

    return NextResponse.json({
      success: true,
      lastSync,
      driveFileCount: driveCount,
      logs: logs.reverse(),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch sync status" },
      { status: 500 }
    );
  }
}
