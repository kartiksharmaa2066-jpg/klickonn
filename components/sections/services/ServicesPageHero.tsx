"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ServicesPageHero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-blue-50/50 to-background pt-24 pb-12 md:pt-32 md:pb-16 lg:pt-40 lg:pb-20 flex items-center justify-center border-b border-border-custom/50">
      {/* Subtle animated background shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0], 
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-[10%] left-[15%] w-72 h-72 bg-secondary/10 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0], 
            opacity: [0.08, 0.12, 0.08] 
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1 
          }}
          className="absolute bottom-[20%] right-[15%] w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
        />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Small badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-bold uppercase tracking-widest text-secondary mb-8 glass-white"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          Our Services
        </motion.div>

        {/* Large heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-tight max-w-4xl mb-6"
        >
          Professional Financial & Travel Solutions{" "}
          <span className="text-primary inline-block">
            For Every Need
          </span>
        </motion.h1>

        {/* Short description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-10"
        >
          We provide expert consultation and comprehensive solutions to help you secure your financial future and plan seamless travel experiences worldwide.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/contact" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-base">
              Book Consultation
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base bg-white/50 backdrop-blur-sm">
              Contact Us
            </Button>
          </Link>
        </motion.div>

      </div>

      {/* Decorative Wave Divider at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 hero-wave pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto text-background">
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
