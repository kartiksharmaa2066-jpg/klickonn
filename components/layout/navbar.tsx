"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services", hasDropdown: true },
    { label: "Resources", href: "/resources", hasDropdown: true },
    { label: "Contact", href: "/contact" },
  ].map((item) => ({
    ...item,
    active:
      item.href === "/"
        ? pathname === "/"
        : pathname.startsWith(item.href),
  }));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-[100] w-full transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-white/40 py-[5px] sm:py-[7px] shadow-lg ring-1 ring-inset ring-white/60"
          : "bg-white/60 backdrop-blur-md border-border-custom/30 py-[5px] sm:py-[8px]"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group">
          <img
            src="/logo-new.jpeg"
            alt="Klick ONN Finvest & Air Travels"
            className="w-[130px] sm:w-[155px] lg:w-[195px] h-auto object-contain group-hover:scale-105 transition-transform duration-150"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium py-2 transition-colors duration-150",
                  item.active
                    ? "text-primary border-b-2 border-primary"
                    : "text-text-secondary hover:text-primary"
                )}
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown className="h-4 w-4 text-text-muted group-hover:text-primary transition-colors" />
                )}
              </Link>
              {item.hasDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 rounded-md border border-border-custom bg-surface py-1 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[200]">
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-xs text-text-secondary hover:bg-muted-surface hover:text-primary"
                  >
                    Overview
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-4 py-2 text-xs text-text-secondary hover:bg-muted-surface hover:text-primary"
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+919501489757"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-muted-surface hover:bg-border-custom text-primary transition-colors duration-150"
            title="Call Us"
          >
            <Phone className="h-5 w-5" />
          </a>
          <Link href="/contact">
            <Button variant="primary" size="md">
              Book Consultation &rarr;
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-muted-surface text-text-secondary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden border-t border-white/40 bg-white/80 backdrop-blur-xl px-6 py-6 absolute top-full left-0 w-full shadow-xl z-[100]">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <div key={item.label} className="flex flex-col">
                <Link
                  href={item.href}
                  className={cn(
                    "text-base font-medium py-1.5 transition-colors",
                    item.active ? "text-primary font-semibold" : "text-text-secondary"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </div>
            ))}
            <hr className="border-border-custom my-2" />
            <div className="flex flex-col gap-3 pt-2">
              <a
                href="tel:+919501489757"
                className="flex items-center gap-3 text-text-secondary font-medium py-1.5"
              >
                <Phone className="h-5 w-5 text-primary" />
                +91 9501489757
              </a>
              <Link href="/contact" className="w-full">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  Book Consultation &rarr;
                </Button>
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.header>
  );
}
