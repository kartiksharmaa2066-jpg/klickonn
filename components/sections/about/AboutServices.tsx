import Link from "next/link";
import {
  TrendingUp,
  Plane,
  Shield,
  FileText,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const serviceCategories = [
  {
    icon: <TrendingUp className="h-6 w-6 text-secondary" />,
    title: "Financial Services",
    items: [
      "Mutual Funds",
      "SIP Investments",
      "Gold & Silver ETFs",
      "Lump Sum Investments",
      "Retirement Planning",
    ],
  },
  {
    icon: <Shield className="h-6 w-6 text-secondary" />,
    title: "Insurance",
    items: [
      "Life Insurance",
      "Health Insurance",
      "General Insurance",
    ],
  },
  {
    icon: <Plane className="h-6 w-6 text-secondary" />,
    title: "Travel Services",
    items: [
      "Flight Bookings",
      "Hotel Reservations",
      "Domestic & International Tours",
      "Group & Corporate Travel",
    ],
  },
  {
    icon: <FileText className="h-6 w-6 text-secondary" />,
    title: "Visa Assistance",
    items: [
      "Tourist Visas",
      "Business Visas",
      "Student Visas",
      "Documentation Support",
    ],
  },
  {
    icon: <Briefcase className="h-6 w-6 text-secondary" />,
    title: "Corporate Solutions",
    items: [
      "Corporate Travel Management",
      "Group Bookings",
      "Business Financial Planning",
    ],
  },
];

export function AboutServices() {
  return (
    <section className="w-full bg-surface py-20 border-t border-border-custom/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          <div className="lg:col-span-6 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              WHAT WE OFFER
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
              One Partner for All Your{" "}
              <span className="text-primary">Financial &amp; Travel</span> Needs
            </h2>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-end lg:pt-6">
            <p className="text-base text-text-secondary leading-relaxed">
              We provide a comprehensive range of consultancy services, ensuring
              you have professional support at every stage of your financial and
              travel journey.
            </p>
          </div>
        </div>

        {/* Service Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((cat, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-background rounded-xl border border-border-custom p-7 hover:border-secondary/40 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
            >
              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-secondary/8 shrink-0 group-hover:scale-105 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-base font-bold text-text-primary">
                  {cat.title}
                </h3>
              </div>

              {/* Service list */}
              <ul className="flex flex-col gap-2 flex-1">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary/60 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* View all services CTA tile */}
          <div className="flex flex-col items-center justify-center bg-primary text-text-inverse rounded-xl p-7 gap-4 text-center">
            <h3 className="text-lg font-bold">Need a Custom Solution?</h3>
            <p className="text-sm text-white/80 leading-relaxed max-w-xs">
              Every client is unique. Contact us to discuss a tailored plan for
              your specific needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-white/80 transition-colors group/link mt-2"
            >
              Contact Us
              <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
