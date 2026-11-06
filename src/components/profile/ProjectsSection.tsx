import { ArrowUpRight, Building2, Info } from "lucide-react";
import type { Project, Profile } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/branding/Logo";

const STATUS_STYLES: Record<Project["status"], string> = {
  "Active company": "border-[#bfe8d2] bg-[#e8f8f0] text-[#0f6b46]",
  "In development": "border-brand-blue/15 bg-brand-blue-soft text-brand-blue",
  Exploration: "border-brand-pink/15 bg-brand-pink-soft text-brand-pink",
};

export function ProjectsSection({ profile }: { profile: Profile }) {
  const { projects } = profile;
  const featured = projects.items[0];
  const rest = projects.items.slice(1);

  return (
    <section id="projects" className="relative py-16 sm:py-24">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-brand-blue to-brand-pink" />
                <span className="eyebrow text-ink-muted">{projects.eyebrow}</span>
              </div>
              <h2 className="display text-[clamp(2.1rem,5vw,3.7rem)] uppercase text-ink">
                My <span className="editorial font-normal normal-case text-brand-pink">projects</span>
                <span className="text-brand-pink">.</span>
              </h2>
              <p className="mt-4 max-w-xl text-[0.84rem] leading-relaxed text-ink-soft">
                Products and platforms from the M.A.R.J.E.N.E workshop. Each one is at a different
                stage of the journey.
              </p>
            </div>
            <p className="inline-flex max-w-xs items-start gap-2 text-[0.68rem] leading-relaxed text-ink-muted">
              <Info size={13} className="mt-0.5 shrink-0" aria-hidden />
              {projects.note}
            </p>
          </div>
        </Reveal>

        {featured && (
          <Reveal className="mt-9" delay={0.04}>
            <div className="glass relative overflow-hidden rounded-[28px] p-5 sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(243,14,120,0.14),transparent_70%)] blur-2xl"
              />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-white/60 shadow-sm backdrop-blur-xl">
                    <LogoMark size={26} />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                        Flagship
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.14em] ${STATUS_STYLES[featured.status]}`}
                      >
                        {featured.status}
                      </span>
                    </div>
                    <h3 className="display mt-2 text-[clamp(1.4rem,2.6vw,2.1rem)] text-ink">
                      {featured.name}
                    </h3>
                    <p className="mt-2 max-w-xl text-[0.84rem] leading-relaxed text-ink-soft">
                      {featured.description}
                    </p>
                  </div>
                </div>

                {featured.href ? (
                  <a
                    href={featured.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-glass shrink-0 !min-h-10 !px-4 !text-[0.72rem]"
                  >
                    <Building2 size={14} aria-hidden />
                    Visit company
                    <ArrowUpRight size={13} aria-hidden />
                  </a>
                ) : (
                  <span className="shrink-0 text-[0.65rem] uppercase tracking-[0.16em] text-ink-muted">
                    Link on request
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        )}

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, index) => (
            <Reveal key={project.name} delay={Math.min(index * 0.05, 0.3)}>
              <div className="glass glass-hover group flex h-auto min-h-full flex-col rounded-[24px] p-5 sm:h-full">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-ink-muted/70">
                    P.{String(index + 2).padStart(2, "0")}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.12em] ${STATUS_STYLES[project.status]}`}
                  >
                    {project.status}
                  </span>
                </div>
                <h3 className="mt-5 text-[0.92rem] font-semibold leading-snug tracking-[-0.02em] text-ink">
                  {project.name}
                </h3>
                <p className="mt-2 flex-1 text-[0.76rem] leading-relaxed text-ink-soft">
                  {project.description}
                </p>
                <div className="mt-5 border-t border-ink/10 pt-3">
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-brand-blue transition-colors hover:text-brand-pink"
                    >
                      Visit project <ArrowUpRight size={11} aria-hidden />
                    </a>
                  ) : (
                    <span className="text-[0.62rem] uppercase tracking-[0.14em] text-ink-muted">
                      Details on request
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
