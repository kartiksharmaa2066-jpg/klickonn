import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";
const TOKEN_EXPIRY_MS = 8 * 60 * 60 * 1000; // 8 hours

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET env var is not set");
  return secret;
}

export function createSessionToken(): string {
  const secret = getSecret();
  const payload = JSON.stringify({
    iat: Date.now(),
    exp: Date.now() + TOKEN_EXPIRY_MS,
  });
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  const signature = hmac.digest("hex");
  return Buffer.from(payload).toString("base64") + "." + signature;
}

export function verifySessionToken(token: string): boolean {
  try {
    const secret = getSecret();
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return false;

    const payload = Buffer.from(payloadB64, "base64").toString("utf-8");

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(payload);
    const expectedSignature = hmac.digest("hex");

    if (!crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expectedSignature, "hex"))) {
      return false;
    }

    const parsed = JSON.parse(payload);
    if (typeof parsed.exp !== "number" || Date.now() > parsed.exp) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function setAuthCookie(response: Response): Response {
  const token = createSessionToken();
  const res = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
  res.headers.append(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${TOKEN_EXPIRY_MS / 1000}`
  );
  return res;
}

export function clearAuthCookie(response: Response): Response {
  const res = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
  res.headers.append(
    "Set-Cookie",
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
  );
  return res;
}

export function verifyRequestAuth(request: NextRequest): boolean {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return false;
  return verifySessionToken(match[1]);
}

export async function verifyServerActionAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

// --- Rate Limiting (in-memory, per-process) ---

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count };
}

// --- Input Validation ---

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidId(id: string | null): id is string {
  if (!id) return false;
  const num = Number(id);
  return Number.isInteger(num) && num > 0;
}

export function sanitizeInput(value: string, maxLength: number): string {
  return value.trim().slice(0, maxLength);
}

const ALLOWED_UPLOAD_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);

const ALLOWED_UPLOAD_EXTENSIONS = new Set([
  ".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf",
]);

export function isValidUploadFile(file: File): { valid: boolean; error?: string } {
  if (file.size > 10 * 1024 * 1024) {
    return { valid: false, error: "File must be under 10MB" };
  }

  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!ALLOWED_UPLOAD_EXTENSIONS.has(ext)) {
    return { valid: false, error: "File type not allowed" };
  }

  if (file.type && !ALLOWED_UPLOAD_TYPES.has(file.type)) {
    return { valid: false, error: "File type not allowed" };
  }

  return { valid: true };
}

export function sanitizeFolderPath(folder: string): string {
  return folder.replace(/[^a-zA-Z0-9/_-]/g, "").replace(/\.\./g, "").slice(0, 100);
}
