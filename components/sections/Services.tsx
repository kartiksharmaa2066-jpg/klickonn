"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Plane, Shield, FileText, CircleDollarSign, Briefcase, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const services = [
  {
    title: "Investments",
    description: "Smart investment solutions to help you grow your wealth.",
    icon: <TrendingUp className="h-6 w-6 text-secondary" />,
    href: "/services",
    accent: "from-blue-500/10 to-indigo-500/5",
  },
  {
    title: "Travel",
    description: "Flights, holidays and customized travel experiences.",
    icon: <Plane className="h-6 w-6 text-secondary" />,
    href: "/services",
    accent: "from-sky-500/10 to-cyan-500/5",
  },
  {
    title: "Insurance",
    description: "Life, health & general insurance plans that protect you.",
    icon: <Shield className="h-6 w-6 text-secondary" />,
    href: "/services",
    accent: "from-emerald-500/10 to-teal-500/5",
  },
  {
    title: "Visa Services",
    description: "Visa assistance for tourist, business & student visas.",
    icon: <FileText className="h-6 w-6 text-secondary" />,
    href: "/services",
    accent: "from-violet-500/10 to-purple-500/5",
  },
  {
    title: "Forex",
    description: "Best exchange rates & overseas money solutions.",
    icon: <CircleDollarSign className="h-6 w-6 text-secondary" />,
    href: "/services",
    accent: "from-amber-500/10 to-yellow-500/5",
  },
  {
    title: "Corporate Solutions",
    description: "Financial & travel solutions tailored for businesses.",
    icon: <Briefcase className="h-6 w-6 text-secondary" />,
    href: "/services",
    accent: "from-rose-500/10 to-pink-500/5",
  },
];

export function Services() {
  return (
    <section className="w-full bg-background py-16 md:py-20 border-t border-border-custom/50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-3 mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/8 border border-secondary/20 text-xs font-bold uppercase tracking-widest text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            OUR SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Solutions Designed Around You
          </h2>
          <p className="text-base text-text-secondary max-w-xl">
            Comprehensive financial and travel services tailored to your needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`group relative flex flex-col items-center text-center bg-white/65 backdrop-blur-md p-8 rounded-2xl border border-white/70 shadow-sm hover:shadow-2xl hover:border-secondary/30 transition-shadow duration-300 overflow-hidden`}
            >
              {/* Coloured gradient fill on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl`} />

              {/* Glassmorphism inner glow ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/50 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center gap-4 w-full">
                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary/8 border border-secondary/15 group-hover:scale-110 group-hover:bg-secondary/20 transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed flex-1 max-w-xs">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary transition-colors group/link mt-1"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
