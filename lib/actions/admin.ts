"use server";

import { verifyServerActionAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export type Submission = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  createdAt: Date | null;
};

export async function getAllSubmissions(): Promise<Submission[]> {
  if (!(await verifyServerActionAuth())) {
    throw new Error("Unauthorized");
  }
  return db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));
}

export async function deleteSubmission(id: number): Promise<{ success: boolean }> {
  if (!(await verifyServerActionAuth())) {
    throw new Error("Unauthorized");
  }
  try {
    const result = await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id)).returning();
    return { success: result.length > 0 };
  } catch (err) {
    console.error("Delete error:", err);
    return { success: false };
  }
}
