import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Plane } from "lucide-react";

export function CTASection() {
  return (
    <section className="w-full bg-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Banner container */}
        <div className="relative w-full bg-primary text-text-inverse rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden shadow-lg">
          
          {/* Subtle background graphics */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {/* Curved dashed line for flight path */}
            <svg className="w-full h-full" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M -50 150 Q 300 50, 680 115"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>
          </div>

          {/* Left Side Content */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 z-10 text-center sm:text-left">
            {/* Calendar Icon container */}
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 shrink-0">
              <Calendar className="h-6 w-6 text-text-inverse" />
            </div>
            {/* Text description */}
            <div className="flex flex-col gap-1.5">
              <h3 className="text-xl sm:text-2xl font-bold">
                Ready to Take the Next Step?
              </h3>
              <p className="text-sm sm:text-base text-white/80 max-w-md font-medium">
                Let's plan your financial future and next journey together.
              </p>
            </div>
          </div>

          {/* Right Side Call to Action Button */}
          <div className="relative flex items-center justify-center z-10 w-full sm:w-auto shrink-0 group">
            {/* Small floating plane icon just above/next to the button */}
            <div className="absolute -top-6 -left-3 rotate-45 text-white/50 animate-bounce hidden md:block">
              <Plane className="h-4.5 w-4.5" />
            </div>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-surface hover:bg-muted-surface hover:text-primary text-primary font-bold border-transparent px-8 shadow-md hover:-translate-y-0.5 transition-transform"
            >
              Book Consultation &rarr;
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
