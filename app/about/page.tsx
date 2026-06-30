import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutMission } from "@/components/sections/about/AboutMission";
import { AboutValues } from "@/components/sections/about/AboutValues";
import { AboutServices } from "@/components/sections/about/AboutServices";
import { AboutCTA } from "@/components/sections/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us | Klick ONN Finvest & Air Travels",
  description:
    "Learn about Klick ONN Finvest & Air Travels — a professional consultancy firm dedicated to helping individuals, families, and businesses with financial planning, investments, insurance, and travel services.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sticky Top Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Page Hero */}
        <AboutHero />

        {/* Mission & Vision */}
        <AboutMission />

        {/* Core Values */}
        <AboutValues />

        {/* Services Overview */}
        <AboutServices />

        {/* Call to Action */}
        <AboutCTA />
      </main>

      {/* Footer Branding & Links */}
      <Footer />
    </div>
  );
}
