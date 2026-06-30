"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, FileText, Plane, BookOpen, Briefcase } from "lucide-react";

const articles = [
  {
    category: "Investment",
    categoryColor: "bg-secondary/10 text-secondary",
    title: "SIP vs Lump Sum: Which is Better for Wealth Creation?",
    date: "May 28, 2026",
    readTime: "6 min read",
    image: "/hero.jpeg",
  },
  {
    category: "Travel",
    categoryColor: "bg-info/10 text-info",
    title: "Essential Travel Insurance Tips for International Trips",
    date: "May 24, 2026",
    readTime: "5 min read",
    image: "/services.jpeg",
  },
  {
    category: "Finance",
    categoryColor: "bg-success/10 text-success",
    title: "Top 5 Tax Saving Investments for FY 2026-27",
    date: "May 20, 2026",
    readTime: "6 min read",
    image: "/design.jpeg",
  },
  {
    category: "Visa Guide",
    categoryColor: "bg-warning/10 text-warning",
    title: "Schengen Visa Checklist: Documents You Need",
    date: "May 18, 2026",
    readTime: "5 min read",
    image: "/hero.jpeg",
  },
];

const popularResources = [
  {
    title: "Investment Planning Guide",
    description: "A complete guide to plan your investments wisely.",
    icon: <Briefcase className="h-5 w-5" />,
    iconBg: "bg-secondary/10 text-secondary",
  },
  {
    title: "Mutual Fund Basics",
    description: "Understand mutual funds and how they work.",
    icon: <BookOpen className="h-5 w-5" />,
    iconBg: "bg-success/10 text-success",
  },
  {
    title: "Travel Checklist",
    description: "Your ultimate checklist for a hassle-free trip.",
    icon: <Plane className="h-5 w-5" />,
    iconBg: "bg-info/10 text-info",
  },
  {
    title: "Visa Documentation Guide",
    description: "Step-by-step guide for visa documentation.",
    icon: <FileText className="h-5 w-5" />,
    iconBg: "bg-warning/10 text-warning",
  },
  {
    title: "Retirement Planning Guide",
    description: "Plan your retirement and secure your future.",
    icon: <Briefcase className="h-5 w-5" />,
    iconBg: "bg-accent/10 text-accent",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export function LatestArticles() {
  return (
    <section className="w-full bg-background py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content — Articles */}
          <div className="lg:col-span-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="flex items-center justify-between mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">
                Latest Articles
              </h2>
              <Link
                href="#"
                className="flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary transition-colors"
              >
                View All Articles <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Article Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {articles.map((article, idx) => (
                <motion.div
                  key={article.title}
                  custom={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group bg-surface rounded-xl border border-border-custom overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                >
                  {/* Article Image */}
                  <div className="relative h-44 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    <span className={`absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${article.categoryColor}`}>
                      {article.category}
                    </span>
                  </div>
                  {/* Article Content */}
                  <div className="p-5 flex flex-col gap-2.5">
                    <h3 className="text-base font-bold text-text-primary leading-snug group-hover:text-secondary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-text-muted" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar — Popular Resources */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            >
              <h3 className="text-xl font-extrabold text-text-primary tracking-tight mb-6">
                Popular Resources
              </h3>
              <div className="flex flex-col gap-4">
                {popularResources.map((resource, idx) => (
                  <motion.div
                    key={resource.title}
                    custom={idx}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-border-custom hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className={`flex items-center justify-center w-11 h-11 rounded-xl shrink-0 ${resource.iconBg}`}>
                      {resource.icon}
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-text-primary group-hover:text-secondary transition-colors">
                        {resource.title}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {resource.description}
                      </p>
                      <span className="flex items-center gap-1 text-xs font-semibold text-secondary mt-1">
                        <Download className="h-3 w-3" /> Download <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
