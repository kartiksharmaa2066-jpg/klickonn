"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Plane } from "lucide-react";

export function CTASection() {
  return (
    <section className="w-full bg-background py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative w-full bg-primary text-text-inverse rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden shadow-2xl"
        >
          {/* Glassmorphism radial glow layers */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

          {/* Dashed flight path SVG */}
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

          {/* Inner glassmorphism border ring */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />

          {/* Left: Icon + Text */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 z-10 text-center sm:text-left">
            {/* Glassmorphism calendar chip */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex items-center justify-center w-14 h-14 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shrink-0 shadow-lg ring-1 ring-inset ring-white/15"
            >
              <Calendar className="h-6 w-6 text-white" />
            </motion.div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-xl sm:text-2xl font-bold">
                Ready to Take the Next Step?
              </h3>
              <p className="text-sm sm:text-base text-white/80 max-w-md font-medium">
                Let&apos;s plan your financial future and next journey together.
              </p>
            </div>
          </div>

          {/* Right: CTA */}
          <div className="relative flex items-center justify-center z-10 w-full sm:w-auto shrink-0">
            {/* Floating animated plane */}
            <motion.div
              animate={{ x: [0, 6, 0], y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-3 rotate-45 text-white/30 hidden md:block"
            >
              <Plane className="h-5 w-5" />
            </motion.div>

            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white/95 hover:bg-white text-primary font-bold border-transparent px-8 shadow-xl hover:-translate-y-0.5 transition-transform backdrop-blur-sm"
              >
                Book Consultation →
              </Button>
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
