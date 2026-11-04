import Link from "next/link";
import { ArrowUpRight, Check, ContactRound, Mail, Phone, ShieldCheck } from "lucide-react";
import type { SocialPlatform } from "@/lib/types";
import { SocialIcon } from "@/components/social/SocialIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CHANNELS: { platform: SocialPlatform; label: string; live?: boolean }[] = [
  { platform: "tiktok", label: "TikTok", live: true },
  { platform: "website", label: "Website", live: true },
  { platform: "email", label: "Email", live: true },
  { platform: "instagram", label: "Instagram" },
  { platform: "linkedin", label: "LinkedIn" },
  { platform: "whatsapp", label: "WhatsApp" },
  { platform: "facebook", label: "Facebook" },
  { platform: "x", label: "X" },
  { platform: "youtube", label: "YouTube" },
  { platform: "snapchat", label: "Snapchat" },
];

export function SocialSection() {
  return (
    <section id="channels" className="relative py-16 sm:py-24">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Connect"
              title={
                <>
                  Every channel.{" "}
                  <span className="editorial font-normal lowercase text-brand-blue">one door</span>
                  <span className="text-brand-pink">.</span>
                </>
              }
              description="Stop repeating yourself across ten different bios. Your KNOW ME profile gathers the platforms you actually use — and quietly leaves out the ones you don't."
            />

            <Reveal delay={0.08} className="mt-7 space-y-3">
              {[
                [
                  "Only real links are rendered",
                  "No placeholder handles. If you don't have a channel, it simply isn't shown.",
                ],
                [
                  "Contact details stay yours",
                  "Publish an email, request a call, or keep your number private — your choice.",
                ],
                [
                  "Add a channel any time",
                  "New platform? Send it to our team and it appears on your profile.",
                ],
              ].map(([title, body]) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue">
                    <Check size={11} strokeWidth={3} aria-hidden />
                  </span>
                  <div>
                    <p className="text-[0.82rem] font-semibold text-ink">{title}</p>
                    <p className="mt-0.5 text-[0.76rem] leading-relaxed text-ink-muted">{body}</p>
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.12} className="mt-7">
              <Link href="/arsene#connect" className="btn btn-glass">
                See a live connect section
                <ArrowUpRight size={14} aria-hidden />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.06}>
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-[38px] bg-[radial-gradient(circle_at_80%_10%,rgba(243,14,120,0.14),transparent_55%),radial-gradient(circle_at_10%_90%,rgba(10,28,180,0.14),transparent_55%)] blur-2xl"
              />

              <div className="glass relative rounded-[30px] p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                      Connect preview
                    </p>
                    <p className="mt-1 text-[0.95rem] font-semibold text-ink">Arsene Kahunga</p>
                  </div>
                  <span className="chip !text-[0.52rem]">Example</span>
                </div>

                <div className="mt-4 grid grid-cols-5 gap-2">
                  {CHANNELS.map(({ platform, label, live }) => (
                    <div
                      key={platform}
                      className={`flex flex-col items-center gap-1.5 rounded-2xl border px-1 py-2.5 ${
                        live
                          ? "!border-white/90 !bg-white/85 text-[#0b1026] shadow-sm"
                          : "!border-white/60 !bg-white/40 text-[#666c88] dark:!border-white/10 dark:!bg-white/5 dark:text-[#939bb9]"
                      }`}
                      title={live ? `${label} — published` : `${label} — available when configured`}
                    >
                      <SocialIcon
                        platform={platform}
                        size={17}
                        colored={live}
                        className={live ? "" : "opacity-45"}
                      />
                      <span className="text-[0.48rem] font-semibold uppercase tracking-[0.08em]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between rounded-2xl border border-white/75 bg-white/55 px-3 py-2.5">
                    <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold text-ink">
                      <ContactRound size={14} className="text-brand-blue" aria-hidden />
                      Add to contact
                    </span>
                    <span className="text-[0.52rem] uppercase tracking-[0.14em] text-ink-muted">
                      .vcf
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center justify-between rounded-2xl border border-white/75 bg-white/55 px-3 py-2.5">
                      <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold text-ink">
                        <Mail size={13} className="text-brand-pink" aria-hidden />
                        Email
                      </span>
                      <Check size={12} className="text-brand-blue" aria-hidden />
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-white/50 bg-white/25 px-3 py-2.5 text-ink-muted">
                      <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold">
                        <Phone size={13} aria-hidden />
                        Call
                      </span>
                      <span className="text-[0.48rem] uppercase tracking-[0.1em]">On request</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 rounded-2xl border border-ink/[0.06] bg-white/30 px-3 py-2.5">
                  <ShieldCheck size={14} className="mt-0.5 shrink-0 text-brand-blue" aria-hidden />
                  <p className="text-[0.62rem] leading-relaxed text-ink-muted">
                    Unpublished channels are shown here only to illustrate the layout. On a real
                    profile, they are never rendered.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
