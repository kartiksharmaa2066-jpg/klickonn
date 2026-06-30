"use client";

import React from "react";
import { motion } from "framer-motion";
import { ServiceDetailCard } from "@/components/ui/ServiceDetailCard";
import { PlaneTakeoff, Hotel, FileText, Map, Building2 } from "lucide-react";

const travelServices = [
  {
    title: "Flight Ticket Booking",
    icon: <PlaneTakeoff className="w-6 h-6 text-secondary" />,
    features: [
      "Domestic & International Flights",
      "All Major Airlines Covered",
      "Best Fares & Competitive Pricing",
      "Flexible Booking Options"
    ],
  },
  {
    title: "Hotel Booking",
    icon: <Hotel className="w-6 h-6 text-secondary" />,
    features: [
      "Budget to Luxury Accommodations",
      "1 Star to 7 Star Hotels",
      "Best Deals Worldwide",
      "Verified & Trusted Properties"
    ],
  },
  {
    title: "Visa Assistance",
    icon: <FileText className="w-6 h-6 text-secondary" />,
    features: [
      "All Countries Visa Processing",
      "Tourist, Business & Student Visas",
      "Hassle-Free Documentation",
      "Expert Guidance & Support"
    ],
  },
  {
    title: "Tour Packages",
    icon: <Map className="w-6 h-6 text-secondary" />,
    features: [
      "Domestic & International Tours",
      "Customized Itineraries",
      "Family & Honeymoon Packages",
      "Specialized Group Tours"
    ],
  },
  {
    title: "Group / Corporate Travel",
    icon: <Building2 className="w-6 h-6 text-secondary" />,
    features: [
      "Best Plans & Premium Support",
      "Corporate Fares & Credit Facilities",
      "MICE (Meetings, Incentives, Conferences, Exhibitions)",
      "Corporate Event Planning"
    ],
  },
];

export function TravelServices() {
  return (
    <section className="relative w-full py-16 lg:py-20 bg-blue-50/30 overflow-hidden border-t border-border-custom/30">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/20 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Air Travel Services
          </h2>
          <p className="text-lg text-text-secondary font-medium">
            Book Your Journey. Discover the World. Travel More. Worry Less.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {travelServices.map((service, index) => (
            <ServiceDetailCard
              key={index}
              title={service.title}
              icon={service.icon}
              features={service.features}
              variant="travel"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
