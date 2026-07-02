"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Send } from "lucide-react";

export function ResourcesNewsletter() {
  return (
    <section className="w-full bg-muted-surface/50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative bg-gradient-to-br from-primary via-primary/95 to-primary rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl"
        >
          {/* Decorative glow layers */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left — Content */}
            <div className="flex flex-col gap-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <Send className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-text-inverse tracking-tight">
                  Stay Updated with Our Latest Insights
                </h2>
              </div>
              <p className="text-sm md:text-base text-white/70 max-w-md leading-relaxed">
                Subscribe to our newsletter and never miss important updates and expert advice.
              </p>
            </div>

            {/* Right — Subscribe Form */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:justify-end">
              <div className="flex items-center w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-5 py-3.5 bg-transparent text-sm text-white placeholder-white/50 outline-none min-w-0 sm:w-64"
                />
              </div>
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto font-bold bg-white text-primary hover:bg-white/90 shrink-0"
              >
                Subscribe <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
