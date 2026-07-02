"use client";

import { motion } from "framer-motion";
import { TrendingUp, Calculator, Receipt, Plane, FileCheck, Shield, BarChart3 } from "lucide-react";

const categories = [
  { label: "Investment Insights", icon: <TrendingUp className="h-6 w-6" />, color: "text-secondary" },
  { label: "Financial Planning", icon: <Calculator className="h-6 w-6" />, color: "text-primary" },
  { label: "Tax Planning", icon: <Receipt className="h-6 w-6" />, color: "text-success" },
  { label: "Travel Guides", icon: <Plane className="h-6 w-6" />, color: "text-info" },
  { label: "Visa Information", icon: <FileCheck className="h-6 w-6" />, color: "text-warning" },
  { label: "Insurance Solutions", icon: <Shield className="h-6 w-6" />, color: "text-accent" },
  { label: "Market Insights", icon: <BarChart3 className="h-6 w-6" />, color: "text-secondary" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45 },
  }),
};

export function ResourceCategories() {
  return (
    <section className="w-full bg-muted-surface/50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">
            Resource Categories
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.label}
              custom={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="flex flex-col items-center gap-3 p-5 bg-surface rounded-xl border border-border-custom shadow-sm hover:shadow-md transition-shadow cursor-pointer text-center group"
            >
              <div className={`${cat.color} group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <span className="text-xs font-semibold text-text-primary leading-tight">
                {cat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
