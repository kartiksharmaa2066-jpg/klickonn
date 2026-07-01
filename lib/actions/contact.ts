"use server";

import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";

export type ContactFormState = {
  success: boolean;
  error: string | null;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Name, email and message are required." };
  }

  try {
    await db.insert(contactSubmissions).values({
      name,
      email,
      phone: phone || null,
      subject: subject || null,
      message,
    });

    return { success: true, error: null };
  } catch (err) {
    console.error("Contact form submission error:", err);
    return { success: false, error: "Something went wrong. Please try again later." };
  }
}
