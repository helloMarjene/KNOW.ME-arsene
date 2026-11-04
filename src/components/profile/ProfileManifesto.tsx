import { ArrowUpRight, Building2, MapPin, Sparkles } from "lucide-react";
import type { Profile } from "@/lib/types";
import { LogoMark } from "@/components/branding/Logo";
import { ToolBadge } from "@/components/profile/ToolBadge";
import { Reveal } from "@/components/ui/Reveal";

export function ProfileManifesto({ profile }: { profile: Profile }) {
  const { identity, contact } = profile;

  return (
    <section id="about" className="relative pb-16 pt-2 sm:pb-24">
      <div className="section-shell">
        <Reveal>
          <div className="glass grain relative overflow-hidden rounded-[30px] p-6 sm:rounded-[36px] sm:p-10 lg:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(243,14,120,0.14),transparent_70%)] blur-2xl"
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-gradient-to-r from-brand-blue to-brand-pink" />
                  <span className="eyebrow text-ink-muted">Introduction</span>
                </div>
                <h2 className="display mt-4 max-w-2xl text-balance text-[clamp(1.9rem,4vw,3.1rem)] text-ink">
                  Ideas into{" "}
                  <span className="editorial font-normal text-brand-blue">working products</span>.
                </h2>

                <div className="mt-6 space-y-4">
                  {identity.intro.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="max-w-2xl text-pretty text-[0.92rem] leading-relaxed text-ink-soft sm:text-[0.98rem]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/60 shadow-sm backdrop-blur-xl">
                    <LogoMark size={22} />
                  </span>
                  <div>
                    <p className="text-[0.82rem] font-semibold text-ink">{identity.fullName}</p>
                    <p className="text-[0.68rem] uppercase tracking-[0.18em] text-ink-muted">
                      {identity.title}
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-soft relative flex flex-col justify-between rounded-[26px] p-5 sm:p-6">
                <div>
                  <p className="eyebrow text-ink-muted">At a glance</p>
                  <dl className="mt-5 space-y-4">
                    <div>
                      <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                        Role
                      </dt>
                      <dd className="mt-1 text-[0.86rem] font-semibold text-ink">
                        {identity.title}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                        Company
                      </dt>
                      <dd className="mt-1 flex items-start gap-2 text-[0.86rem] text-ink">
                        <Building2 size={14} className="mt-0.5 shrink-0 text-brand-blue" aria-hidden />
                        {identity.company}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                        Based in
                      </dt>
                      <dd className="mt-1 flex items-start gap-2 text-[0.86rem] text-ink">
                        <MapPin size={14} className="mt-0.5 shrink-0 text-brand-pink" aria-hidden />
                        {identity.location}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                        Focus
                      </dt>
                      <dd className="mt-1 flex items-start gap-2 text-[0.86rem] text-ink">
                        <Sparkles size={14} className="mt-0.5 shrink-0 text-brand-blue" aria-hidden />
                        Practical software, products and digital systems.
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-7 border-t border-ink/10 pt-5">
                  <p className="editorial text-[1.7rem] leading-tight text-ink">
                    &ldquo;{identity.tagline}&rdquo;
                  </p>
                  <a
                    href={contact.website ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-blue transition-colors hover:text-brand-pink"
                  >
                    marjenesoftwaredev.com
                    <ArrowUpRight size={12} aria-hidden />
                  </a>
                </div>
              </div>
            </div>

            {identity.tools.length > 0 && (
              <div className="relative mt-10 border-t border-ink/10 pt-8">
                <div className="grid gap-5 lg:grid-cols-[16rem_1fr] lg:gap-10">
                  <div>
                    <p className="eyebrow text-ink-muted">Tools &amp; interests</p>
                    <p className="mt-2 text-[0.78rem] leading-relaxed text-ink-muted">
                      Technologies I work with, explore and develop using — not a claim of mastery
                      in every one.
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    {identity.tools.map((tool) => (
                      <ToolBadge key={tool} tool={tool} />
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
