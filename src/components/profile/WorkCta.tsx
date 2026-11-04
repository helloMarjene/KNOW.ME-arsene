import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import type { Profile } from "@/lib/types";
import { LogoMark } from "@/components/branding/Logo";
import { Reveal } from "@/components/ui/Reveal";

export function WorkCta({ profile }: { profile: Profile }) {
  const { cta, contact, identity } = profile;

  return (
    <section className="section-shell py-16 sm:py-24">
      <Reveal>
        <div className="glass-dark grain relative overflow-hidden rounded-[34px] p-6 text-white sm:p-10 lg:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(35,56,216,0.5),transparent_66%)] blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(243,14,120,0.3),transparent_66%)] blur-2xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-[#6d7cff] to-brand-pink" />
                <span className="eyebrow text-white/55">Work with M.A.R.J.E.N.E</span>
              </div>
              <h2 className="display mt-4 max-w-2xl text-balance text-[clamp(2rem,4.6vw,3.6rem)] text-white">
                Have an idea?{" "}
                <span className="editorial font-normal text-[#f7a8c9]">
                  Let&rsquo;s build something meaningful.
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-[0.9rem] leading-relaxed text-white/60">
                {cta.body}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  {cta.buttonLabel}
                  <ArrowUpRight size={15} aria-hidden />
                </a>
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="btn !min-h-12 border border-white/15 bg-white/10 px-5 text-white/90 backdrop-blur-xl transition-colors hover:bg-white/20"
                  >
                    <Mail size={15} aria-hidden />
                    {contact.email}
                  </a>
                )}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/12 bg-white/[0.055] p-5 backdrop-blur-xl sm:p-6">
              <div className="flex items-center gap-2 text-white/70">
                <Sparkles size={14} aria-hidden />
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em]">
                  A considerate process
                </p>
              </div>
              <ol className="mt-5 space-y-4">
                {[
                  ["01", "Tell us the idea", "A conversation, not a form."],
                  ["02", "We shape it", "Design, content and structure."],
                  ["03", "We build and publish", "You receive the link and QR."],
                ].map(([step, title, detail]) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[0.52rem] font-semibold text-white/70">
                      {step}
                    </span>
                    <div>
                      <p className="text-[0.8rem] font-semibold text-white/90">{title}</p>
                      <p className="text-[0.7rem] leading-relaxed text-white/45">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <p className="editorial text-[1.15rem] text-white/70">
                  &ldquo;{identity.tagline}&rdquo;
                </p>
                <LogoMark size={26} />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
