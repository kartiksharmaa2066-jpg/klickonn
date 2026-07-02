import {
  ShieldCheck,
  Users,
  BookOpen,
  Zap,
  Scale,
  Heart,
} from "lucide-react";

const values = [
  {
    icon: <ShieldCheck className="h-6 w-6 text-secondary" />,
    title: "Trust & Transparency",
    description:
      "We communicate openly and honestly. Our clients always know what they are getting and why.",
  },
  {
    icon: <Users className="h-6 w-6 text-secondary" />,
    title: "Client-First Approach",
    description:
      "Every recommendation we make is shaped by your goals — not by what is easiest for us.",
  },
  {
    icon: <BookOpen className="h-6 w-6 text-secondary" />,
    title: "Informed Guidance",
    description:
      "We educate before we advise. Understanding comes before any decision or commitment.",
  },
  {
    icon: <Zap className="h-6 w-6 text-secondary" />,
    title: "Hassle-Free Experience",
    description:
      "Complex paperwork, planning, and coordination — handled with care so you don't have to worry.",
  },
  {
    icon: <Scale className="h-6 w-6 text-secondary" />,
    title: "Accuracy Over Hype",
    description:
      "We never make promises we cannot keep. Accuracy and honesty are the foundation of our advice.",
  },
  {
    icon: <Heart className="h-6 w-6 text-secondary" />,
    title: "Long-Term Partnership",
    description:
      "We are here for the journey — not just a single transaction. Your success is our commitment.",
  },
];

export function AboutValues() {
  return (
    <section className="w-full bg-background py-20 border-t border-border-custom/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            WHAT WE STAND FOR
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Our Core Values
          </h2>
          <p className="text-base text-text-secondary max-w-xl">
            The principles that guide every consultation, every recommendation,
            and every interaction we have with our clients.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="flex gap-4 items-start bg-surface p-7 rounded-xl border border-border-custom hover:border-secondary/40 hover:shadow-md transition-all duration-200 group"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/8 shrink-0 group-hover:scale-105 transition-transform">
                {value.icon}
              </div>
              {/* Text */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-bold text-text-primary">
                  {value.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
