import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ResourcesPageHero } from "@/components/sections/resources/ResourcesPageHero";
import { ResourceCenter } from "@/components/sections/resources/ResourceCenter";
import { ResourceCategories } from "@/components/sections/resources/ResourceCategories";
import { ResourcesFAQ } from "@/components/sections/resources/ResourcesFAQ";
import { ResourcesNewsletter } from "@/components/sections/resources/ResourcesNewsletter";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Resources | Klick ONN Finvest & Air Travels",
  description:
    "Explore expert insights, guides, official updates, and tools to help you make smart financial and travel decisions.",
};
export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sticky Top Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section */}
        <ResourcesPageHero />

        {/* Resource Center — Guides + Official Updates */}
        <ResourceCenter />

        {/* Resource Categories */}
        <ResourceCategories />

        {/* FAQ Section */}
        <ResourcesFAQ />

        {/* Newsletter / Subscribe */}
        <ResourcesNewsletter />

        {/* Call to Action */}
        <CTASection />
      </main>

      {/* Footer Branding & Links */}
      <Footer />
    </div>
  );
}
