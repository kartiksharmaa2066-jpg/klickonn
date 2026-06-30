"use client";

import React from "react";
import { motion } from "framer-motion";
import { ServiceDetailCard } from "@/components/ui/ServiceDetailCard";
import { LineChart, Coins, ShieldCheck, HeartHandshake } from "lucide-react";

const investmentServices = [
  {
    title: "Mutual Funds",
    icon: <LineChart className="w-6 h-6 text-secondary" />,
    features: [
      "Systematic Investment Plans (SIP)",
      "Lumpsum Investments",
      "Diversified Portfolios",
      "Goal-based Investment Planning"
    ],
  },
  {
    title: "Gold ETFs & Silver",
    icon: <Coins className="w-6 h-6 text-secondary" />,
    features: [
      "Gold Exchange Traded Funds (ETFs)",
      "Silver Investments",
      "Commodity Diversification",
      "Secure Digital Holding"
    ],
  },
  {
    title: "Insurance Plans",
    icon: <ShieldCheck className="w-6 h-6 text-secondary" />,
    features: [
      "Life Insurance Policies",
      "Comprehensive Health Insurance",
      "General & Property Insurance",
      "Risk Management Consulting"
    ],
  },
  {
    title: "Retirement & Wealth",
    icon: <HeartHandshake className="w-6 h-6 text-secondary" />,
    features: [
      "Retirement Planning",
      "Wealth Management",
      "Digital Financial Solutions",
      "Estate Planning Guidance"
    ],
  },
];

export function InvestmentServices() {
  return (
    <section className="relative w-full py-16 lg:py-20 bg-white overflow-hidden border-t border-border-custom/30">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/10 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Investment & Fintech Services
          </h2>
          <p className="text-lg text-text-secondary font-medium">
            Secure Your Future. Explore the World. Plan Today for a Better Tomorrow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-12">
          {investmentServices.map((service, index) => (
            <ServiceDetailCard
              key={index}
              title={service.title}
              icon={service.icon}
              features={service.features}
              variant="investment"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
