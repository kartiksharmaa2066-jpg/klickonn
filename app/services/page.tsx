import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicesPageHero } from "@/components/sections/services/ServicesPageHero";
import { InvestmentServices } from "@/components/sections/services/InvestmentServices";
import { TravelServices } from "@/components/sections/services/TravelServices";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Our Services | Klick ONN Finvest & Air Travels",
  description: "Explore our comprehensive financial and travel services, including mutual funds, insurance, flight bookings, and customized tour packages.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sticky Top Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        <ServicesPageHero />
        <InvestmentServices />
        <TravelServices />
        <CTASection />
      </main>

      {/* Footer Branding & Links */}
      <Footer />
    </div>
  );
}
