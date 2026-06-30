import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative w-full bg-linear-to-b from-surface via-background to-surface overflow-hidden pt-16 lg:pt-24 pb-24">
      {/* Subtle decorative background element */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/4 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full bg-secondary/4 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-text-muted mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-text-secondary font-medium">About Us</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left — Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Section label */}
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-secondary">
              <span className="w-8 h-[2px] bg-secondary inline-block" />
              ABOUT KLICK ONN
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-text-primary leading-[1.15]">
              Your Trusted Partner in{" "}
              <span className="text-primary">Finance &amp; Travel.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Klick ONN Finvest &amp; Air Travels is a professional consultancy
              firm helping individuals, families, and businesses navigate the
              complexities of financial planning and travel with clarity,
              confidence, and care.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link href="/contact">
                <Button variant="primary" size="lg" className="w-full sm:w-auto font-semibold">
                  Get In Touch <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <a href="tel:+919501489757">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-semibold">
                  <Phone className="h-4 w-4 mr-2" /> Call Us Now
                </Button>
              </a>
            </div>
          </div>

          {/* Right — Stats & identity card */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Identity card */}
            <div className="bg-surface rounded-2xl border border-border-custom shadow-xs p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3 pb-5 border-b border-border-custom/60">
                {/* Logo mark (matching Navbar) */}
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted-surface shrink-0">
                  <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="14" stroke="var(--color-primary)" strokeWidth="3" strokeDasharray="60 20" className="rotate-45 origin-center" />
                    <path d="M12 28L28 12M28 12H20M28 12V20" stroke="var(--color-accent)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-extrabold tracking-wider text-primary leading-tight">
                    KLICK ONN
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-text-secondary leading-none">
                    FINVEST &amp; AIR TRAVELS
                  </span>
                </div>
              </div>

              {/* Key facts */}
              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: "Business Type", value: "Financial & Travel Consultancy" },
                  { label: "Services", value: "Investments, Insurance, Travel, Visa & More" },
                  { label: "Tagline", value: "Your Dreams, Our Commitment" },
                ].map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
                      {fact.label}
                    </span>
                    <span className="text-sm font-semibold text-text-primary">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
