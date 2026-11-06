import {
  Braces,
  Globe2,
  LayoutGrid,
  Monitor,
  PenTool,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Profile } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS: Record<string, LucideIcon> = {
  globe: Globe2,
  smartphone: Smartphone,
  monitor: Monitor,
  braces: Braces,
  layout: LayoutGrid,
  pen: PenTool,
  sparkles: Sparkles,
};

const SPANS = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
];

export function ServicesSection({ profile }: { profile: Profile }) {
  const { services } = profile;

  return (
    <section id="build" className="relative py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={
            <>
              What I{" "}
              <span className="editorial font-normal normal-case text-brand-blue">build</span>
              <span className="text-brand-pink">.</span>
            </>
          }
          description="From the first sketch to the shipped product — websites, apps, systems and the digital details in between."
        />

        <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {services.items.map((service, index) => {
            const Icon = ICONS[service.icon] ?? Sparkles;
            return (
              <Reveal
                key={service.title}
                delay={Math.min(index * 0.04, 0.25)}
                className={SPANS[index] ?? "lg:col-span-2"}
              >
                <div className="glass glass-hover group relative flex min-h-[10.5rem] h-full flex-col justify-between overflow-hidden rounded-[24px] p-5 sm:p-6">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(10,28,180,0.12),transparent_70%)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/60 text-brand-blue shadow-sm backdrop-blur-xl transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white">
                      <Icon size={19} aria-hidden />
                    </span>
                    <span className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-ink-muted/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-[0.98rem] font-semibold tracking-[-0.02em] text-ink">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 max-w-xs text-[0.78rem] leading-relaxed text-ink-soft">
                      {service.description}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand-blue to-brand-pink transition-transform duration-500 group-hover:scale-x-100"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
