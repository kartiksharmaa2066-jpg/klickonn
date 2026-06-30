"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "What are the best investment options for beginners?",
    answer:
      "For beginners, we typically recommend starting with Systematic Investment Plans (SIPs) in mutual funds, which allow you to invest small amounts regularly. Other good options include Public Provident Fund (PPF), National Pension System (NPS), and index funds. The right choice depends on your risk tolerance, financial goals, and time horizon. We recommend consulting with our advisors to create a personalized plan.",
  },
  {
    question: "How can I apply for a Schengen visa?",
    answer:
      "To apply for a Schengen visa, you need to gather required documents (passport, travel insurance, flight bookings, hotel reservations, financial proof), fill out the application form, and submit it at the nearest VFS Global or embassy visa centre. The process typically takes 15-30 days. Our travel experts can guide you through the entire process and help ensure your application is complete.",
  },
  {
    question: "What documents are required for travel insurance?",
    answer:
      "For travel insurance, you generally need a copy of your passport, flight itinerary, hotel bookings, and details of your trip duration. Some policies may also require medical history declarations. We help you compare plans from leading insurers and choose the coverage that best fits your travel needs.",
  },
  {
    question: "How do I start planning for retirement?",
    answer:
      "Retirement planning starts with understanding your current expenses, estimating future needs, and choosing the right mix of investment vehicles. Key options include NPS, PPF, EPF, mutual fund SIPs, and annuity plans. The earlier you start, the more compounding works in your favor. Our retirement planning experts can help you build a roadmap tailored to your goals.",
  },
];

export function ResourcesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-background py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left — FAQ */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="flex flex-col gap-3">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="bg-surface rounded-xl border border-border-custom overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    aria-expanded={openIndex === idx}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted-surface/50 transition-colors"
                  >
                    <span className="text-sm font-semibold text-text-primary pr-4">
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-text-muted">
                      {openIndex === idx ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div id={`faq-answer-${idx}`} role="region" className="px-6 pb-4 text-sm text-text-secondary leading-relaxed border-t border-border-custom/50 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Still Have Questions? */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
              className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-border-custom p-8 text-center flex flex-col items-center gap-5 sticky top-28"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/10">
                <HelpCircle className="h-8 w-8 text-secondary" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-text-primary">
                  Still have questions?
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                  Our experts are here to help you make the right choices.
                </p>
              </div>
              <Link href="/contact">
                <Button size="lg" className="font-semibold">
                  Ask an Expert <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
