import Link from "next/link";
import { ArrowUpRight, Fingerprint, Images, Link2, QrCode } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const PILLARS = [
  {
    icon: Fingerprint,
    title: "Identity",
    body: "Who you are, what you do and the words that introduce you properly.",
  },
  {
    icon: Images,
    title: "Story",
    body: "Your real photographs, arranged into chapters people want to scroll.",
  },
  {
    icon: Link2,
    title: "Connection",
    body: "Every platform and contact route you choose to publish, in one place.",
  },
  {
    icon: QrCode,
    title: "Access",
    body: "A permanent link and a print-ready QR that never goes out of date.",
  },
];

export function WhatIs() {
  return (
    <section id="idea" className="relative py-16 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="What KNOW ME is"
              title={
                <>
                  More than a link in a bio
                  <span className="text-brand-pink">.</span>
                </>
              }
              description="A KNOW ME profile is a designed, living introduction. Not a template you fight with — a considered digital presence built around one person, their photographs and the way they want to be discovered."
            />

            <Reveal delay={0.06} className="mt-8">
              <p className="editorial text-[clamp(1.25rem,2.7vw,1.7rem)] leading-snug text-ink-soft">
                Someone opens your link. Within seconds they know your face, your work and exactly
                how to reach you.
              </p>
              <Link
                href="/arsene"
                className="group mt-6 inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-brand-blue"
              >
                Open Arsene&rsquo;s live profile
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </Reveal>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-[40px] bg-[radial-gradient(circle_at_70%_20%,rgba(243,14,120,0.14),transparent_60%),radial-gradient(circle_at_20%_80%,rgba(10,28,180,0.14),transparent_60%)] blur-2xl"
            />
            <div className="relative grid gap-3 sm:grid-cols-2">
              {PILLARS.map(({ icon: Icon, title, body }, index) => (
                <Reveal
                  key={title}
                  delay={0.05 * index}
                  className={index % 2 === 1 ? "sm:translate-y-6" : ""}
                >
                  <div className="glass glass-hover h-full rounded-[24px] p-5">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white/70 text-brand-blue shadow-sm">
                      <Icon size={19} strokeWidth={1.7} aria-hidden />
                    </span>
                    <h3 className="display mt-5 text-[1.15rem] uppercase tracking-[-0.02em] text-ink">
                      {title}
                    </h3>
                    <p className="mt-2 text-[0.78rem] leading-relaxed text-ink-muted">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
