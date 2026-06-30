import React from "react";
import Link from "next/link";
import { TrendingUp, Plane, Shield, FileText, CircleDollarSign, Briefcase, ArrowRight } from "lucide-react";

export function Services() {
  const services = [
    {
      title: "Investments",
      description: "Smart investment solutions to help you grow your wealth.",
      icon: <TrendingUp className="h-6 w-6 text-secondary" />,
      href: "#",
    },
    {
      title: "Travel",
      description: "Flights, holidays and customized travel experiences.",
      icon: <Plane className="h-6 w-6 text-secondary" />,
      href: "#",
    },
    {
      title: "Insurance",
      description: "Life, health & general insurance plans that protect you.",
      icon: <Shield className="h-6 w-6 text-secondary" />,
      href: "#",
    },
    {
      title: "Visa Services",
      description: "Visa assistance for tourist, business & student visas.",
      icon: <FileText className="h-6 w-6 text-secondary" />,
      href: "#",
    },
    {
      title: "Forex",
      description: "Best exchange rates & overseas money solutions.",
      icon: <CircleDollarSign className="h-6 w-6 text-secondary" />,
      href: "#",
    },
    {
      title: "Corporate Solutions",
      description: "Financial & travel solutions tailored for businesses.",
      icon: <Briefcase className="h-6 w-6 text-secondary" />,
      href: "#",
    },
  ];

  return (
    <section className="w-full bg-background py-20 border-t border-border-custom/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            OUR SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Solutions Designed Around You
          </h2>
          <p className="text-base text-text-secondary max-w-xl">
            Comprehensive financial and travel services tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center bg-surface p-8 rounded-xl border border-border-custom shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-secondary/40 transition-all duration-200 group"
            >
              {/* Icon Container */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary/8 mb-6 group-hover:scale-105 transition-transform">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-text-primary mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1 max-w-xs">
                {service.description}
              </p>

              {/* Link */}
              <Link
                href={service.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary transition-colors group/link"
              >
                Learn More
                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
