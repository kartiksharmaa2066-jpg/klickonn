"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "How can I book a consultation?",
    answer:
      "You can book a consultation by filling out the contact form on this page, calling us directly at +91 9501489757, or clicking the 'Book Consultation' button. Our team will get back to you within 24 hours to schedule a session at your convenience.",
  },
  {
    question: "What documents are required for a visa application?",
    answer:
      "Visa requirements vary by country and visa type. Generally, you'll need a valid passport, passport-size photographs, flight bookings, hotel reservations, travel insurance, financial statements, and a cover letter. Our visa experts can guide you through the specific requirements for your destination.",
  },
  {
    question: "Do you charge for the initial consultation?",
    answer:
      "We offer a complimentary initial consultation to understand your needs and discuss how we can help. This helps us determine the best approach for your financial or travel requirements before any commitment.",
  },
  {
    question: "How can I track my visa application status?",
    answer:
      "Once your visa application is submitted, you can track its status through the respective embassy or VFS Global portal. Our team will also keep you updated on the progress and notify you of any actions needed.",
  },
  {
    question: "What are the payment options available?",
    answer:
      "We accept payments via bank transfer, UPI, credit/debit cards, and cheque. For investment-related services, payment terms will be discussed during your consultation. We ensure complete transparency in all our billing.",
  },
];

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-muted-surface/50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left — FAQ List */}
          <div className="lg:col-span-5">
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
                    aria-controls={`contact-faq-answer-${idx}`}
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
                        <div id={`contact-faq-answer-${idx}`} role="region" className="px-6 pb-4 text-sm text-text-secondary leading-relaxed border-t border-border-custom/50 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Middle — FAQ Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-3 flex items-center justify-center"
          >
            <div className="relative w-full max-w-xs">
              {/* FAQ illustration card */}
              <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-3xl p-8 flex flex-col items-center gap-4 border border-border-custom/50">
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary/15">
                  <span className="text-4xl font-extrabold text-secondary">FAQ</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary/80" />
                </div>
                <p className="text-xs text-text-muted text-center leading-relaxed">
                  Find answers to common questions about our services
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Still Need Help? */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="bg-surface rounded-2xl border border-border-custom p-8 shadow-sm">
              <h3 className="text-xl font-extrabold text-text-primary tracking-tight mb-3">
                Still Need Help?
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Our experts are just a call or email away. Let us help you make informed
                financial and travel decisions.
              </p>
              <Link href="/contact">
                <Button size="lg" className="font-semibold">
                  Book a Consultation <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>

              {/* Decorative support illustration */}
              <div className="mt-8 flex items-center justify-center">
                <div className="relative w-40 h-28">
                  {/* Headset icon */}
                  <div className="absolute left-0 bottom-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/10 border border-secondary/20">
                    <svg className="w-8 h-8 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                    </svg>
                  </div>
                  {/* Document icon */}
                  <div className="absolute right-0 top-0 flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20">
                    <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  {/* Globe icon */}
                  <div className="absolute right-4 bottom-2 flex items-center justify-center w-10 h-10 rounded-lg bg-info/10 border border-info/20">
                    <svg className="w-5 h-5 text-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
