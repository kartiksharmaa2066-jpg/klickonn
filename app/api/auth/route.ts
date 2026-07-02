import { NextResponse } from "next/server";
import { setAuthCookie, checkRateLimit } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    if (process.env.NODE_ENV !== "development") {
      const { allowed } = checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
      if (!allowed) {
        return NextResponse.json(
          { error: "Too many login attempts. Please try again later." },
          { status: 429 }
        );
      }
    }

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      return NextResponse.json(
        { error: "Admin credentials not configured" },
        { status: 500 }
      );
    }

    const usernameMatch = username === adminUsername;
    const passwordMatch = password === adminPassword;

    if (usernameMatch && passwordMatch) {
      const response = NextResponse.json({ success: true });
      return setAuthCookie(response);
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
