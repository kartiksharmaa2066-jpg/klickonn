"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, Headphones } from "lucide-react";

const trustBadges = [
  { icon: <Shield className="h-4 w-4" />, label: "Trusted Financial Advisors" },
  { icon: <Users className="h-4 w-4" />, label: "Expert Guidance" },
  { icon: <Headphones className="h-4 w-4" />, label: "End-to-End Support" },
];

export function ContactHero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[10%] w-80 h-80 bg-secondary/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-white/10 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.04]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-white/90 w-fit glass-white"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Contact Us
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-inverse tracking-tight leading-[1.1]"
            >
              We&apos;re Here to Help You{" "}
              <span className="text-secondary">Plan a Better Future</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-white/70 max-w-lg leading-relaxed"
            >
              Have a question or need personalized guidance?{" "}
              Our team is ready to assist you.
            </motion.p>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-6 mt-2"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm font-medium text-white/80"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/15">
                    {badge.icon}
                  </span>
                  {badge.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Decorative illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-80 h-80">
              {/* City skyline silhouette */}
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 opacity-20">
                <div className="w-6 h-20 bg-white/40 rounded-t-sm" />
                <div className="w-8 h-32 bg-white/30 rounded-t-sm" />
                <div className="w-5 h-24 bg-white/35 rounded-t-sm" />
                <div className="w-10 h-40 bg-white/25 rounded-t-sm" />
                <div className="w-7 h-28 bg-white/30 rounded-t-sm" />
                <div className="w-4 h-16 bg-white/35 rounded-t-sm" />
                <div className="w-9 h-36 bg-white/28 rounded-t-sm" />
                <div className="w-6 h-22 bg-white/32 rounded-t-sm" />
              </div>
              {/* Globe */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <svg className="w-16 h-16 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              {/* Location pin */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-8 w-12 h-12 rounded-full bg-secondary/30 backdrop-blur-sm border border-white/20 flex items-center justify-center"
              >
                <svg className="w-6 h-6 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </motion.div>
              {/* Airplane */}
              <motion.div
                animate={{ x: [0, 10, 0], y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-16 left-6 text-white/50 rotate-12"
              >
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
