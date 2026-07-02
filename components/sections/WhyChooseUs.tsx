"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { UserCheck, Award, Handshake, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Personalized Approach",
    description: "Solutions tailored to your financial and travel goals.",
    icon: <UserCheck className="h-6 w-6 text-secondary" />,
  },
  {
    title: "Expert Guidance",
    description: "Qualified professionals with deep industry knowledge.",
    icon: <Award className="h-6 w-6 text-secondary" />,
  },
  {
    title: "End-to-End Support",
    description: "From planning to execution, we're with you at every step.",
    icon: <Handshake className="h-6 w-6 text-secondary" />,
  },
  {
    title: "Wide Network",
    description: "Strong partnerships and global connections to serve you better.",
    icon: <Globe className="h-6 w-6 text-secondary" />,
  },
];

export function WhyChooseUs() {
  return (
    <section className="w-full py-16 md:py-20 border-t border-border-custom/50 relative overflow-hidden">
      {/* Glassmorphism section background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted-surface via-background to-muted-surface" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            <span className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-secondary/8 border border-secondary/20 text-xs font-bold uppercase tracking-widest text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              WHY CHOOSE US
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
              Committed to Your Goals,{" "}
              <br />
              Every Step
            </h2>
            <p className="text-base text-text-secondary leading-relaxed max-w-md">
              We combine expertise with a client-first approach to deliver
              trustworthy solutions that truly make a difference.
            </p>

            {/* Glassmorphism highlight card */}
            <div className="mt-1 p-5 rounded-2xl border border-white/60 bg-white/50 backdrop-blur-md shadow-md ring-1 ring-inset ring-white/70">
              <p className="text-sm text-text-secondary leading-relaxed italic">
                &ldquo;Every recommendation we make is based on your specific situation — not a generic template.&rdquo;
              </p>
            </div>

            <div className="mt-2">
              <Link href="/about">
                <Button variant="outline" size="md" className="font-semibold">
                  Know More About Us →
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right column — feature cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:pl-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.18 } }}
                className="group flex gap-4 items-start p-6 rounded-2xl border border-white/60 bg-white/55 backdrop-blur-md shadow-sm hover:shadow-xl hover:border-secondary/25 hover:bg-white/80 transition-shadow duration-300 ring-1 ring-inset ring-white/50"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/8 border border-secondary/15 shrink-0 group-hover:scale-110 group-hover:bg-secondary/18 transition-all duration-300">
                  {feature.icon}
                </div>
                {/* Text */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
