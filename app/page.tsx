import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Klick ONN Finvest & Air Travels | Financial & Travel Consultancy",
  description:
    "Your trusted partner for investments, travel, insurance, visas and more. Expert financial and travel consultancy services.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sticky Top Header */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Banner Section */}
        <Hero />
        
        {/* Core Services Section */}
        <Services />
        
        {/* Trust & Features Section */}
        <WhyChooseUs />
        
        {/* Contact Action Banner Section */}
        <CTASection />
      </main>
      
      {/* Footer Branding & Links */}
      <Footer />
    </div>
  );
}
