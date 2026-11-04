import { BrainCircuit, Briefcase, Compass, Layers3, LockKeyhole } from "lucide-react";
import type { Timeline } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { BirthdayCountdown } from "./BirthdayCountdown";

const ICONS = {
  briefcase: Briefcase,
  layers: Layers3,
  brain: BrainCircuit,
  compass: Compass,
} as const;

export function TimelineSection({ timeline }: { timeline: Timeline }) {
  return (
    <section id="timeline" className="relative py-16 sm:py-24">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-brand-blue to-brand-pink" />
                <span className="eyebrow text-ink-muted">Life &amp; career</span>
              </div>
              <h2 className="display text-[clamp(2.1rem,5vw,3.7rem)] uppercase text-ink">
                My <span className="editorial font-normal normal-case text-brand-blue">timeline</span>
                <span className="text-brand-pink">.</span>
              </h2>
            </div>
            {timeline.birthday && <BirthdayCountdown birthday={timeline.birthday} />}
          </div>
        </Reveal>

        <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_19rem] lg:gap-12">
          <Reveal>
            <ol className="relative space-y-3 before:absolute before:bottom-6 before:left-[1.45rem] before:top-6 before:w-px before:bg-gradient-to-b before:from-brand-blue/40 before:via-brand-pink/30 before:to-transparent sm:before:left-[1.7rem]">
              {timeline.entries.map((entry, index) => {
                const Icon = ICONS[entry.icon] ?? Compass;
                const current = index === 0;
                return (
                  <li key={`${entry.period}-${entry.title}`} className="relative pl-[4rem] sm:pl-[4.6rem]">
                    <span
                      className={`absolute left-0 top-1 inline-flex h-[2.9rem] w-[2.9rem] items-center justify-center rounded-full sm:h-[3.4rem] sm:w-[3.4rem] ${
                        current
                          ? "bg-gradient-to-br from-brand-blue to-[#3a199e] text-white shadow-[0_16px_36px_-16px_rgba(10,28,180,0.7)]"
                          : "glass text-ink-soft"
                      }`}
                    >
                      <Icon size={current ? 19 : 17} aria-hidden />
                    </span>
                    <div
                      className={`glass glass-hover rounded-[22px] p-5 ${
                        current ? "border-brand-blue/20" : ""
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] ${
                            current
                              ? "bg-brand-blue-soft text-brand-blue"
                              : "bg-ink/[0.05] text-ink-muted"
                          }`}
                        >
                          {entry.period}
                        </span>
                        {current && (
                          <span className="inline-flex items-center gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-brand-pink" aria-hidden />
                            Current chapter
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-[1.02rem] font-semibold tracking-[-0.02em] text-ink">
                        {entry.title}
                      </h3>
                      <p className="mt-1.5 text-[0.83rem] leading-relaxed text-ink-soft">
                        {entry.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass sticky top-28 rounded-[24px] p-5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/[0.05] text-ink-soft">
                <LockKeyhole size={16} aria-hidden />
              </span>
              <p className="mt-4 text-[0.82rem] font-semibold text-ink">Published with consent</p>
              <p className="mt-2 text-[0.76rem] leading-relaxed text-ink-muted">{timeline.note}</p>
              <div className="mt-5 hairline" />
              <p className="mt-4 text-[0.64rem] uppercase tracking-[0.18em] text-ink-muted">
                Birthday visibility is optional
              </p>
              <p className="mt-1.5 text-[0.72rem] leading-relaxed text-ink-muted">
                Dates, milestones and personal details are only added when Arsene approves them for
                publication.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
