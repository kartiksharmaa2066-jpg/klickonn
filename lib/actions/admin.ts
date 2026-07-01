"use server";

import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

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
  return db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));
}

export async function deleteSubmission(id: number): Promise<{ success: boolean }> {
  try {
    const { eq } = await import("drizzle-orm");
    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
    return { success: true };
  } catch (err) {
    console.error("Delete error:", err);
    return { success: false };
  }
}
