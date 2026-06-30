"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CanvasHeroImage } from "@/components/ui/CanvasHeroImage";
import { ShieldCheck, UserCheck, Clock, ShieldAlert, ArrowRight } from "lucide-react";

export function Hero() {
  const trustItems = [
    { icon: <ShieldCheck className="h-4.5 w-4.5 text-secondary shrink-0" />, label: "Reliable Solutions" },
    { icon: <UserCheck className="h-4.5 w-4.5 text-secondary shrink-0" />, label: "Expert Guidance" },
    { icon: <Clock className="h-4.5 w-4.5 text-secondary shrink-0" />, label: "Hassle-Free Experience" },
    { icon: <ShieldCheck className="h-4.5 w-4.5 text-secondary shrink-0" />, label: "Complete Transparency" },
  ];

  return (
    <section className="relative w-full bg-linear-to-b from-surface via-background to-surface overflow-hidden pt-12 lg:pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Content Column */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left z-10">
          {/* Tagline */}
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-secondary">
            <span className="w-8 h-[2px] bg-secondary inline-block"></span>
            YOUR DREAMS, OUR COMMITMENT
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-text-primary leading-[1.15]">
            One Destination for <br className="hidden sm:inline" />
            <span className="text-primary">Your Finance, Travel &amp; </span>
            <span className="text-primary">Peace of Mind.</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
            Expert solutions for investments, travel, insurance, visas and more — all
            under one trusted partner. We simplify complex decisions for your security
            and leisure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button variant="primary" size="lg" className="w-full sm:w-auto font-semibold">
              Explore Services <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto font-semibold">
              Book Consultation
            </Button>
          </div>

          {/* Trust Items Grid */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-8 pt-8 border-t border-border-custom/80 max-w-lg">
            {trustItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                {item.icon}
                <span className="text-xs sm:text-sm font-semibold text-text-secondary">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image Column */}
        <div className="lg:col-span-6 flex items-center justify-center relative w-full aspect-[4/3] lg:aspect-square max-w-[550px] lg:max-w-none mx-auto lg:mx-0">
          {/* Visual gradient background */}
          <div className="absolute inset-0 bg-radial-gradient from-secondary/5 to-transparent rounded-full filter blur-2xl scale-95" />
          
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xs flex items-center justify-center bg-transparent">
            <CanvasHeroImage className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
