import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface border-t border-border-custom pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted-surface">
              <svg
                className="w-8 h-8"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="14"
                  stroke="var(--color-primary)"
                  strokeWidth="3"
                  strokeDasharray="60 20"
                  className="rotate-45 origin-center"
                />
                <path
                  d="M12 28L28 12M28 12H20M28 12V20"
                  stroke="var(--color-accent)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-wider text-primary leading-tight">
                KLICK ONN
              </span>
              <span className="text-[9px] font-bold tracking-widest text-text-secondary leading-none">
                FINVEST & AIR TRAVELS
              </span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-text-secondary pr-4">
            Your trusted partner for investments, travel, insurance, visas and more.
            One destination. Many solutions.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
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
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                ),
                label: "LinkedIn",
              },
              { icon: <Mail className="h-4 w-4" />, label: "Email" },
            ].map((social, idx) => (
              <a
                key={idx}
                href="#"
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
            {["About Us", "Our Advisors", "Careers", "Contact Us"].map((link) => (
              <Link
                key={link}
                href="#"
                className="text-sm text-text-secondary hover:text-primary transition-colors"
              >
                {link}
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
            {[
              "Investments",
              "Travel",
              "Insurance",
              "Visa Services",
              "Forex",
              "Corporate Solutions",
            ].map((link) => (
              <Link
                key={link}
                href="#"
                className="text-sm text-text-secondary hover:text-primary transition-colors"
              >
                {link}
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
            {["Blog", "Guides", "FAQs", "Travel Tips"].map((link) => (
              <Link
                key={link}
                href="#"
                className="text-sm text-text-secondary hover:text-primary transition-colors"
              >
                {link}
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
              <span>Mumbai, India</span>
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
          <Link href="#" className="text-xs text-text-muted hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs text-text-muted hover:text-primary">
            Terms & Conditions
          </Link>
          <Link href="#" className="text-xs text-text-muted hover:text-primary">
            Refund Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
