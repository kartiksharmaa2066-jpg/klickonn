"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceDetailCardProps = {
  title: string;
  icon: React.ReactNode;
  features: string[];
  variant?: "investment" | "travel";
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export function ServiceDetailCard({ title, icon, features, variant = "investment" }: ServiceDetailCardProps) {
  // Determine gradient color based on variant
  const gradient = variant === "investment" 
    ? "from-blue-500/10 to-indigo-500/5" 
    : "from-sky-500/10 to-cyan-500/5";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className={cn(
        "group relative flex flex-col items-start bg-white/65 backdrop-blur-md px-8 py-10 rounded-2xl border border-white/70 shadow-sm transition-all duration-[250ms] overflow-hidden text-left hover:shadow-2xl hover:border-secondary/30",
        "glass glass-shadow"
      )}
    >
      {/* Coloured gradient fill on hover */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] rounded-2xl", gradient)} />

      {/* Glassmorphism inner glow ring */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/50 pointer-events-none group-hover:ring-secondary/10 transition-all duration-[250ms]" />

      <div className="relative z-10 flex flex-col w-full h-full gap-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 shrink-0 rounded-full bg-secondary/10 border border-secondary/20 group-hover:scale-110 group-hover:bg-secondary/25 transition-all duration-[250ms]">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors duration-[250ms]">
            {title}
          </h3>
        </div>
        
        <div className="w-full h-px bg-border-custom/50 group-hover:bg-secondary/20 transition-colors duration-[250ms]" />

        <ul className="flex flex-col gap-4 mt-2 flex-1">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-secondary mt-0.5" />
              <span className="text-base text-text-secondary leading-loose font-medium">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
