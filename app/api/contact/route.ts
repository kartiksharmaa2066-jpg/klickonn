import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, isValidEmail, sanitizeInput } from "@/lib/auth";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  const { allowed } = checkRateLimit(`contact:${ip}`, 5, 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const safeName = sanitizeInput(String(name), 100);
    const safeEmail = sanitizeInput(String(email), 254);
    const safePhone = phone ? sanitizeInput(String(phone), 20) : null;
    const safeSubject = subject ? sanitizeInput(String(subject), 100) : null;
    const safeMessage = sanitizeInput(String(message), 5000);

    if (!isValidEmail(safeEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    await db.insert(contactSubmissions).values({
      name: safeName,
      email: safeEmail,
      phone: safePhone,
      subject: safeSubject,
      message: safeMessage,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
