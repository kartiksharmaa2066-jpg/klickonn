import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { ContactFAQ } from "@/components/sections/contact/ContactFAQ";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Contact Us | Klick ONN Finvest & Air Travels",
  description:
    "Get in touch with Klick ONN Finvest & Air Travels. Contact us for financial consultation, travel planning, insurance advisory, and visa assistance.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sticky Top Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section */}
        <ContactHero />

        {/* Contact Form + Office Details + Map */}
        <ContactInfo />

        {/* FAQ Section */}
        <ContactFAQ />

        {/* Call to Action */}
        <CTASection />
      </main>

      {/* Footer Branding & Links */}
      <Footer />
    </div>
  );
}
