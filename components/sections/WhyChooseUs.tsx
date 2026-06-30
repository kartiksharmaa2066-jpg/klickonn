import React from "react";
import { UserCheck, Award, Handshake, Globe } from "lucide-react";

export function WhyChooseUs() {
  const features = [
    {
      title: "Personalized Approach",
      description: "Solutions tailored to your financial and travel goals.",
      icon: <UserCheck className="h-6 w-6 text-secondary" />,
    },
    {
      title: "Expert Guidance",
      description: "Qualified professionals with deep industry knowledge.",
      icon: <Award className="h-6 w-6 text-secondary" />,
    },
    {
      title: "End-to-End Support",
      description: "From planning to execution, we're with you at every step.",
      icon: <Handshake className="h-6 w-6 text-secondary" />,
    },
    {
      title: "Wide Network",
      description: "Strong partnerships and global connections to serve you better.",
      icon: <Globe className="h-6 w-6 text-secondary" />,
    },
  ];

  return (
    <section className="w-full bg-surface py-20 border-t border-border-custom/50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Left column - Content heading */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            WHY CHOOSE US
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
            Committed to Your Goals, <br />
            Every Step
          </h2>
          <p className="text-base text-text-secondary leading-relaxed max-w-md">
            We combine expertise with a client-first approach to deliver trustworthy
            solutions that truly make a difference in your financial planning and travel
            journeys.
          </p>
        </div>

        {/* Right column - Features grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:pl-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              {/* Icon Container */}
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/8 shrink-0">
                {feature.icon}
              </div>
              {/* Text */}
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
