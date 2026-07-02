import { NextRequest, NextResponse } from "next/server";
import { verifyRequestAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  if (verifyRequestAuth(request)) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
