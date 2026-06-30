import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

export function AboutCTA() {
  return (
    <section className="w-full bg-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Banner container — matches CTASection style */}
        <div className="relative w-full bg-primary text-text-inverse rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden shadow-lg">
          {/* Subtle background graphic */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M -50 150 Q 300 50, 680 115"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>
          </div>

          {/* Left — Message */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 z-10 text-center sm:text-left">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 shrink-0">
              <MessageCircle className="h-6 w-6 text-text-inverse" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-xl sm:text-2xl font-bold">
                Ready to Start Your Journey?
              </h3>
              <p className="text-sm sm:text-base text-white/80 max-w-md font-medium">
                Talk to our consultants today. We are here to simplify your
                financial and travel decisions.
              </p>
            </div>
          </div>

          {/* Right — Action Buttons */}
          <div className="relative flex flex-col sm:flex-row items-center gap-3 z-10 w-full sm:w-auto shrink-0">
            {/* Phone CTA */}
            <a href="tel:+919501489757" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Us
              </Button>
            </a>

            {/* Book Consultation CTA */}
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-surface hover:bg-muted-surface hover:text-primary text-primary font-bold border-transparent px-8 shadow-md hover:-translate-y-0.5 transition-transform"
              >
                Book Consultation &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
