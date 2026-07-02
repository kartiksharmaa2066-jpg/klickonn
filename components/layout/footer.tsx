"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    label: "Facebook",
    href: "#",
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
    href: "#",
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
    href: "#",
  },
  { icon: <Mail className="h-4 w-4" />, label: "Email", href: "mailto:info@klickonnfinvest.com" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Advisors", href: "/about" },
  { label: "Careers", href: "/contact" },
  { label: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  { label: "Investments", href: "/services" },
  { label: "Travel", href: "/services" },
  { label: "Insurance", href: "/services" },
  { label: "Visa Services", href: "/services" },
  { label: "Forex", href: "/services" },
  { label: "Corporate Solutions", href: "/services" },
];

const resourceLinks = [
  { label: "Blog", href: "/resources" },
  { label: "Guides", href: "/resources" },
  { label: "FAQs", href: "/resources" },
  { label: "Travel Tips", href: "/resources" },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white/70 backdrop-blur-md border-t border-white/60 ring-1 ring-inset ring-white/40 pt-16 pb-8 shadow-inner"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-new.jpeg"
              alt="Klick ONN Finvest & Air Travels"
              width={160}
              height={40}
              className="w-[160px] h-auto object-contain"
            />
          </Link>
          <p className="text-sm leading-relaxed text-text-secondary pr-4">
            Your trusted partner for investments, travel, insurance, visas and more.
            One destination. Many solutions.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-border-custom hover:bg-primary hover:text-text-inverse hover:border-primary text-text-secondary transition-all duration-150"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Company Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary">
            Company
          </h4>
          <nav className="flex flex-col gap-2.5">
            {companyLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-text-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Services Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary">
            Services
          </h4>
          <nav className="flex flex-col gap-2.5">
            {serviceLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-text-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Resources Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary">
            Resources
          </h4>
          <nav className="flex flex-col gap-2.5">
            {resourceLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-text-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary">
            Contact Us
          </h4>
          <div className="flex flex-col gap-3.5">
            <a
              href="tel:+919501489757"
              className="flex items-start gap-2.5 text-sm text-text-secondary hover:text-primary transition-colors"
            >
              <Phone className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
              <span>+91 9501489757</span>
            </a>
            <a
              href="mailto:info@klickonnfinvest.com"
              className="flex items-start gap-2.5 text-sm text-text-secondary hover:text-primary transition-colors break-all"
            >
              <Mail className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
              <span>info@klickonnfinvest.com</span>
            </a>
            <div className="flex items-start gap-2.5 text-sm text-text-secondary">
              <MapPin className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
              <span>14, 2nd Floor, Highway Homes, Dhakoli, Zirakpur, SAS Nagar 160104</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-border-custom flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-muted">
          &copy; {currentYear} Klick ONN Finvest & Air Travels. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-xs text-text-muted hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-xs text-text-muted hover:text-primary">
            Terms & Conditions
          </Link>
          <Link href="/refund" className="text-xs text-text-muted hover:text-primary">
            Refund Policy
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
