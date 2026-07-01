"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, UserCheck, Clock, Lock, ArrowRight, Calendar } from "lucide-react";

export function Hero() {
  const trustItems = [
    { icon: <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-white shrink-0" />, label: "Reliable Solutions" },
    { icon: <UserCheck className="h-4 w-4 sm:h-5 sm:w-5 text-white shrink-0" />, label: "Expert Guidance" },
    { icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white shrink-0" />, label: "Hassle-Free Experience" },
    { icon: <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-white shrink-0" />, label: "Complete Transparency" },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero image — full colour, full bleed */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpeg"
          alt="Klick ONN — Finance, Travel and Peace of Mind"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        {/* Dark tint — increased for better text contrast */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Subtle bottom fade into the page */}
        <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Main hero content — centered */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 pt-10 pb-4 sm:px-6 sm:pt-20 sm:pb-10 text-center flex flex-col items-center gap-3 sm:gap-6">

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-1.5 sm:gap-3 text-[9px] sm:text-xs font-bold uppercase tracking-widest text-white/90"
        >
          <span className="w-5 sm:w-8 h-[2px] bg-white/70 inline-block" />
          YOUR DREAMS, OUR COMMITMENT
          <span className="w-5 sm:w-8 h-[2px] bg-white/70 inline-block" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="text-[26px] sm:text-5xl lg:text-[58px] font-extrabold tracking-tight text-white leading-[1.12] drop-shadow-md"
        >
          One Destination for{" "}
          <br className="hidden sm:inline" />
          <span className="text-sky-200">Your Finance, Travel &amp; </span>
          <br className="hidden sm:inline" />
          <span className="text-sky-200">Peace</span>
          {" "}of Mind.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55, ease: "easeOut" }}
          className="text-[13px] sm:text-lg text-white/85 leading-relaxed max-w-xl drop-shadow-sm"
        >
          Expert solutions for investments, travel, insurance, visas and
          more — all under one trusted partner.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-2.5 sm:gap-4"
        >
          <Link href="/services" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="font-semibold shadow-lg bg-secondary hover:bg-secondary/90 w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-[13px] sm:text-base">
              Explore Services <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
          {/* Glassmorphism outline button */}
          <Link href="/contact" className="w-full sm:w-auto">
            <button className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-white border border-white/30 bg-white/15 backdrop-blur-md hover:bg-white/25 transition-all duration-200 text-[13px] sm:text-base shadow-md">
              <Calendar className="h-4 w-4 text-white" />
              Book Consultation
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Trust bar — glassmorphism pill */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.55, ease: "easeOut" }}
        className="relative z-10 max-w-3xl mx-auto px-6 pb-0"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-xl sm:rounded-2xl overflow-hidden border border-white/25 bg-white/10 backdrop-blur-md shadow-xl">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center gap-1 sm:gap-2 px-2.5 py-2.5 sm:px-4 sm:py-5 bg-white/10 hover:bg-white/20 transition-colors duration-200"
            >
              {item.icon}
              <span className="text-[9px] sm:text-sm font-semibold text-white text-center leading-snug">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Wave divider */}
      <div className="relative z-10 w-full leading-none mt-0">
        <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 72 Q360 10 720 40 Q1080 70 1440 20 L1440 72 Z" fill="var(--color-background)" />
        </svg>
      </div>
    </section>
  );
}
