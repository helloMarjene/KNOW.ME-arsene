import Link from "next/link";
import { ArrowUpRight, MessageCircle, PenTool, Rocket, RefreshCw } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STEPS = [
  {
    icon: MessageCircle,
    number: "01",
    title: "A conversation",
    body: "Tell us who you are, what you do and how you want to be introduced. No forms, no dashboards — a real conversation with our team.",
    detail: "30–45 minutes",
  },
  {
    icon: PenTool,
    number: "02",
    title: "We design it",
    body: "We shape your photographs into visual chapters, write the structure and build the layout around your identity — never a generic template.",
    detail: "Design & build",
  },
  {
    icon: Rocket,
    number: "03",
    title: "We publish it",
    body: "Your profile goes live on its permanent link with a matching QR code. Share it on a card, in a meeting or in your bio.",
    detail: "Live link + QR",
  },
  {
    icon: RefreshCw,
    number: "04",
    title: "We keep it current",
    body: "New photographs, a new role, a new platform. Send us the update and we keep your profile accurate and looking sharp.",
    detail: "Managed updates",
  },
];

export function HowItWorks() {
  const emailHref = `mailto:${SITE.company.email}?subject=${encodeURIComponent(
    "Start my KNOW ME profile",
  )}`;

  return (
    <section id="how" className="relative py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From conversation to{" "}
              <span className="editorial font-normal lowercase text-brand-blue">published</span>
              <span className="text-brand-pink">.</span>
            </>
          }
          description="KNOW ME is fully managed. You bring the story; we handle the design, the build and every update after launch."
          action={
            <a href={emailHref} className="btn btn-primary">
              Start the conversation
              <ArrowUpRight size={15} aria-hidden />
            </a>
          }
        />

        <div className="relative mt-11">
          <div
            aria-hidden
            className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-brand-blue/30 via-brand-pink/25 to-transparent lg:left-0 lg:top-[2.6rem] lg:h-px lg:w-full lg:bg-gradient-to-r"
          />

          <ol className="grid gap-3 lg:grid-cols-4 lg:gap-4">
            {STEPS.map(({ icon: Icon, number, title, body, detail }, index) => (
              <Reveal key={number} delay={0.06 * index}>
                <li className="glass glass-hover relative h-full rounded-[26px] p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/85 bg-white/80 text-brand-blue shadow-[0_12px_30px_-18px_rgba(9,14,55,0.45)]">
                      <Icon size={20} strokeWidth={1.7} aria-hidden />
                    </span>
                    <span className="display text-[2.1rem] leading-none text-ink/[0.09]">
                      {number}
                    </span>
                  </div>
                  <p className="mt-5 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-brand-pink">
                    {detail}
                  </p>
                  <h3 className="display mt-1.5 text-[1.22rem] uppercase text-ink">{title}</h3>
                  <p className="mt-2.5 text-[0.8rem] leading-relaxed text-ink-muted">{body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-8">
          <div className="glass-soft flex flex-col items-start justify-between gap-4 rounded-[24px] px-5 py-4 sm:flex-row sm:items-center">
            <p className="text-[0.82rem] leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">Already have a profile?</span> Send us the
              change — a new photograph, role or link — and we&rsquo;ll update it for you.
            </p>
            <Link
              href="/arsene#share"
              className="group inline-flex shrink-0 items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-brand-blue"
            >
              See how sharing works
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
