import { Target, Eye } from "lucide-react";

export function AboutMission() {
  return (
    <section className="w-full bg-surface py-20 border-t border-border-custom/50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        {/* Left — Section label & heading */}
        <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-28">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            OUR PURPOSE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
            Why We Exist
          </h2>
          <p className="text-base text-text-secondary leading-relaxed max-w-md">
            Klick ONN was built on a simple belief — that every person deserves
            clear, honest, and professional guidance for their financial journey
            and travel aspirations.
          </p>
        </div>

        {/* Right — Mission + Vision cards */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Mission Card */}
          <div className="bg-background rounded-xl border border-border-custom p-8 flex gap-5 items-start">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/8 shrink-0">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-text-primary">Our Mission</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                To create a premium consultancy experience that reflects
                professionalism, trust, and expertise. We guide individuals and
                businesses through financial decisions and travel planning with
                clarity and confidence — removing confusion and simplifying
                complex choices.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-background rounded-xl border border-border-custom p-8 flex gap-5 items-start">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/8 shrink-0">
              <Eye className="h-6 w-6 text-secondary" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-text-primary">Our Vision</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                To build a scalable digital presence that grows alongside our
                clients — offering them a single, reliable destination for
                financial planning, investment guidance, insurance consultation,
                travel management, and visa assistance, now and into the future.
              </p>
            </div>
          </div>

          {/* Divider detail */}
          <div className="flex items-center gap-3 pt-2">
            <span className="w-8 h-[2px] bg-secondary inline-block" />
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
              Trusted by families, professionals &amp; corporates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
