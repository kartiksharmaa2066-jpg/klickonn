"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  MapPin,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const officeDetails = [
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Address",
    value: "14, 2nd Floor, Highway Homes,\nDhakoli, Zirakpur,\nSAS Nagar 160104",
    iconBg: "bg-secondary/10 text-secondary",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Phone",
    value: "+91 9501489757",
    iconBg: "bg-success/10 text-success",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    value: "info@klickonnfinvest.com",
    iconBg: "bg-info/10 text-info",
  },
];

const socialLinks = [
  {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    label: "Facebook",
  },
  {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    label: "LinkedIn",
  },
  {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
    label: "Instagram",
  },
  {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
    label: "YouTube",
  },
  {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
    label: "Twitter",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export function ContactInfo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again later.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="w-full bg-background py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left — Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="bg-surface rounded-2xl border border-border-custom p-8 shadow-sm">
              <h2 className="text-2xl font-extrabold text-text-primary tracking-tight mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Status Messages */}
                {status === "success" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-success/10 border border-success/20 text-sm text-success">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    Your message has been sent successfully!
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-error/10 border border-error/20 text-sm text-error">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {errorMsg}
                  </div>
                )}
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-text-secondary">
                      Full Name
                    </label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-muted-surface/50 border border-border-custom rounded-lg focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary/30 transition-all">
                      <User className="h-4 w-4 text-text-muted shrink-0" />
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        required
                        aria-required="true"
                        value={formData.name}
                        onChange={handleChange}
                        className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-disabled outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold text-text-secondary">
                      Email Address
                    </label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-muted-surface/50 border border-border-custom rounded-lg focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary/30 transition-all">
                      <Mail className="h-4 w-4 text-text-muted shrink-0" />
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        aria-required="true"
                        value={formData.email}
                        onChange={handleChange}
                        className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-disabled outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-phone" className="text-xs font-semibold text-text-secondary">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-muted-surface/50 border border-border-custom rounded-lg focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary/30 transition-all">
                    <Phone className="h-4 w-4 text-text-muted shrink-0" />
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-disabled outline-none"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-semibold text-text-secondary">
                    Subject
                  </label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-muted-surface/50 border border-border-custom rounded-lg focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary/30 transition-all">
                    <MessageSquare className="h-4 w-4 text-text-muted shrink-0" />
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="flex-1 bg-transparent text-sm text-text-primary outline-none cursor-pointer"
                    >
                      <option value="" disabled>
                        How can we help you?
                      </option>
                      <option value="investment">Investment Consultation</option>
                      <option value="insurance">Insurance Advisory</option>
                      <option value="travel">Travel Planning</option>
                      <option value="visa">Visa Assistance</option>
                      <option value="other">Other</option>
                    </select>
                    <svg className="h-4 w-4 text-text-muted shrink-0 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-text-secondary">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Type your message here..."
                    required
                    aria-required="true"
                    value={formData.message}
                    onChange={handleChange}
                    className="px-4 py-3 bg-muted-surface/50 border border-border-custom rounded-lg text-sm text-text-primary placeholder-text-disabled outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-bold mt-2"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Send Message"} <Send className="h-4 w-4 ml-1" />
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Middle — Office Details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-surface rounded-2xl border border-border-custom p-8 shadow-sm">
              <h2 className="text-2xl font-extrabold text-text-primary tracking-tight mb-6">
                Our Office
              </h2>

              <div className="flex flex-col gap-6">
                {officeDetails.map((detail, idx) => (
                  <motion.div
                    key={detail.label}
                    custom={idx}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${detail.iconBg}`}
                    >
                      {detail.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-bold text-text-primary">
                        {detail.label}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-line">
                        {detail.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Map + Social */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-4"
          >
            {/* Map */}
            <div className="bg-surface rounded-2xl border border-border-custom overflow-hidden shadow-sm">
              <div className="relative h-56 bg-muted-surface">
                {/* Static map placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 relative overflow-hidden">
                    {/* Simplified map grid lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Grid roads */}
                      <line x1="0" y1="80" x2="400" y2="80" stroke="#CBD5E1" strokeWidth="1" />
                      <line x1="0" y1="140" x2="400" y2="140" stroke="#CBD5E1" strokeWidth="1" />
                      <line x1="0" y1="200" x2="400" y2="200" stroke="#CBD5E1" strokeWidth="1" />
                      <line x1="100" y1="0" x2="100" y2="250" stroke="#CBD5E1" strokeWidth="1" />
                      <line x1="200" y1="0" x2="200" y2="250" stroke="#CBD5E1" strokeWidth="1" />
                      <line x1="300" y1="0" x2="300" y2="250" stroke="#CBD5E1" strokeWidth="1" />
                      {/* Main roads */}
                      <line x1="0" y1="120" x2="400" y2="120" stroke="#94A3B8" strokeWidth="2" />
                      <line x1="180" y1="0" x2="180" y2="250" stroke="#94A3B8" strokeWidth="2" />
                      {/* Location pin */}
                      <g transform="translate(195, 95)">
                        <circle cx="0" cy="0" r="16" fill="#D62828" opacity="0.2" />
                        <circle cx="0" cy="0" r="8" fill="#D62828" />
                        <circle cx="0" cy="0" r="3" fill="white" />
                      </g>
                    </svg>
                    {/* Office label */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[70%] bg-surface rounded-lg shadow-lg border border-border-custom px-3 py-2 text-center z-10">
                      <p className="text-[10px] font-bold text-text-primary leading-tight">
                        Klick ONN Finvest &<br />Air Travels
                      </p>
                      <p className="text-[8px] text-text-muted mt-0.5">
                        Dhakoli, Zirakpur
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=14+2nd+Floor+Highway+Homes+Dhakoli+Zirakpur+SAS+Nagar+160104"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-secondary hover:text-primary transition-colors"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>

            {/* Follow Us */}
            <div className="mt-6 bg-surface rounded-2xl border border-border-custom p-6 shadow-sm">
              <h3 className="text-lg font-extrabold text-text-primary tracking-tight mb-4">
                Follow Us
              </h3>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-border-custom hover:bg-primary hover:text-text-inverse hover:border-primary text-text-secondary transition-all duration-150"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
