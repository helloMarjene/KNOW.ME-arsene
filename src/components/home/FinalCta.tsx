import Link from "next/link";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { SITE } from "@/lib/site";
import { LogoMark } from "@/components/branding/Logo";
import { Reveal } from "@/components/ui/Reveal";

const NEXT = [
  "You send a short email introducing yourself.",
  "We reply and arrange a 30-minute conversation.",
  "We agree the scope, then design and build your profile.",
  "You approve it. We publish and hand over your link and QR.",
];

export function FinalCta() {
  const emailHref = `mailto:${SITE.company.email}?subject=${encodeURIComponent(
    "I'd like a KNOW ME profile",
  )}&body=${encodeURIComponent(
    "Hi KNOW ME team,\n\nMy name is:\nWhat I do:\nA link to my work or socials:\n\nI'd like to talk about a profile.",
  )}`;

  return (
    <section id="start" className="relative py-16 sm:py-24">
      <div className="section-shell">
        <Reveal>
          <div className="glass grain relative overflow-hidden rounded-[32px] p-6 sm:rounded-[40px] sm:p-10 lg:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-32 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(243,14,120,0.2),transparent_66%)] blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-40 -left-24 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(10,28,180,0.18),transparent_66%)] blur-2xl"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <div className="flex items-center gap-3">
                  <LogoMark size={26} />
                  <span className="eyebrow text-ink-muted">Begin your profile</span>
                </div>

                <h2 className="display mt-5 text-balance text-[clamp(2.3rem,5.6vw,4.4rem)] leading-[0.92] text-ink">
                  Your story deserves a{" "}
                  <span className="editorial font-normal lowercase text-brand-blue">
                    proper home
                  </span>
                  <span className="text-brand-pink">.</span>
                </h2>

                <p className="mt-5 max-w-xl text-[0.92rem] leading-relaxed text-ink-soft">
                  One conversation is all it takes to begin. No forms, no dashboards, no monthly
                  tinkering. Just a considered profile that represents you properly — built by people
                  who care how it looks and works.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-2.5">
                  <a href={emailHref} className="btn btn-primary">
                    <Mail size={15} aria-hidden />
                    Start with an email
                  </a>
                  <Link href="/arsene" className="btn btn-glass group">
                    Explore the live example
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </div>

                <p className="mt-4 text-[0.68rem] text-ink-muted">
                  Or write directly to{" "}
                  <a
                    href={`mailto:${SITE.company.email}`}
                    className="font-semibold text-ink underline decoration-brand-pink/40 underline-offset-2 hover:decoration-brand-pink"
                  >
                    {SITE.company.email}
                  </a>
                  .
                </p>
              </div>

              <div className="relative">
                <div className="rounded-[26px] border border-white/80 bg-white/45 p-5 backdrop-blur-xl sm:p-6">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-ink-muted">
                    What happens next
                  </p>
                  <ol className="mt-4 space-y-3.5">
                    {NEXT.map((step, index) => (
                      <li key={step} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/80 text-[0.58rem] font-bold tabular-nums text-brand-blue shadow-sm">
                          {index + 1}
                        </span>
                        <p className="text-[0.78rem] leading-relaxed text-ink-soft">{step}</p>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-5 flex items-start gap-2 border-t border-ink/[0.08] pt-4">
                    <Check size={13} className="mt-0.5 shrink-0 text-brand-pink" aria-hidden />
                    <p className="text-[0.66rem] leading-relaxed text-ink-muted">
                      There is no public sign-up and no obligation. If we&rsquo;re not the right fit,
                      we&rsquo;ll say so.
                    </p>
                  </div>
                </div>

                <div className="animate-float glass absolute -bottom-4 -right-3 hidden items-center gap-2 rounded-full px-3.5 py-2.5 text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-ink-soft sm:flex [animation-delay:-4s]">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden />
                  {SITE.company.tagline}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
