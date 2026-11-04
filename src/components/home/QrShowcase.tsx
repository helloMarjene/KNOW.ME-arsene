import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Printer, QrCode, ScanLine, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/branding/Logo";

const USES = [
  { icon: Printer, label: "Business cards" },
  { icon: ScanLine, label: "Desk stands" },
  { icon: QrCode, label: "Slides & posters" },
];

export function QrShowcase() {
  return (
    <section id="print" className="relative py-16 sm:py-24">
      <div className="section-shell">
        <Reveal>
          <div className="glass grain relative overflow-hidden rounded-[32px] p-5 sm:rounded-[40px] sm:p-9 lg:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(243,14,120,0.16),transparent_68%)] blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(10,28,180,0.14),transparent_68%)] blur-2xl"
            />

            <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-gradient-to-r from-brand-blue to-brand-pink" />
                  <span className="eyebrow text-ink-muted">Share &amp; print</span>
                </div>
                <h2 className="display mt-4 text-[clamp(2rem,4.6vw,3.6rem)] uppercase text-ink">
                  One scan.{" "}
                  <span className="editorial font-normal normal-case text-brand-blue">
                    everything
                  </span>
                  <span className="text-brand-pink">.</span>
                </h2>
                <p className="mt-4 max-w-xl text-[0.9rem] leading-relaxed text-ink-soft">
                  Every profile comes with a high-resolution QR code that points at the permanent
                  profile URL — not at a phone number or an email that changes. Print it once. It
                  keeps working.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {USES.map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/55 px-3.5 py-2 text-[0.68rem] font-semibold text-ink-soft backdrop-blur-xl"
                    >
                      <Icon size={13} className="text-brand-blue" aria-hidden />
                      {label}
                    </span>
                  ))}
                </div>

                <div className="mt-7 grid gap-2 sm:grid-cols-2">
                  {[
                    ["2048px PNG", "For screens and quick printing"],
                    ["Vector SVG", "For designers and large formats"],
                    ["Quiet zone included", "Scans reliably at print size"],
                    ["URL only", "No personal data inside the code"],
                  ].map(([title, body]) => (
                    <div
                      key={title}
                      className="rounded-2xl border border-white/70 bg-white/35 px-3.5 py-3 backdrop-blur-md"
                    >
                      <p className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-ink">
                        <ShieldCheck size={12} className="text-brand-blue" aria-hidden />
                        {title}
                      </p>
                      <p className="mt-0.5 text-[0.66rem] leading-snug text-ink-muted">{body}</p>
                    </div>
                  ))}
                </div>

                <Link href="/arsene#share" className="btn btn-primary mt-7">
                  Generate &amp; download
                  <ArrowUpRight size={15} aria-hidden />
                </Link>
                <p className="mt-3 text-[0.62rem] leading-relaxed text-ink-muted">
                  The demo code beside this text points to Arsene&rsquo;s profile. Every profile gets
                  its own.
                </p>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative mx-auto w-full max-w-[22rem]">
                  <div
                    aria-hidden
                    className="absolute -inset-5 rounded-[42px] bg-[conic-gradient(from_120deg,rgba(10,28,180,0.16),rgba(243,14,120,0.16),rgba(10,28,180,0.16))] blur-2xl"
                  />
                  <div className="relative rotate-[1.6deg] rounded-[26px] border border-white/80 bg-white/70 p-3 shadow-[0_40px_80px_-40px_rgba(9,14,55,0.55)] backdrop-blur-2xl transition-transform duration-700 hover:rotate-0">
                    <div className="rounded-[18px] bg-white p-4">
                      <div className="flex items-start justify-between">
                        <div className="inline-flex items-center gap-2">
                          <LogoMark size={22} />
                          <span className="display text-[0.8rem] uppercase tracking-[0.14em] text-ink">
                            Know<span className="text-brand-pink">Me</span>
                          </span>
                        </div>
                        <span className="text-[0.46rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                          Scan to discover
                        </span>
                      </div>

                      <Image
                        src="/qr/arsene-demo.png"
                        alt="QR code linking to Arsene Kahunga's KNOW ME profile"
                        width={1024}
                        height={1024}
                        className="mt-3 h-auto w-full rounded-lg"
                      />

                      <div className="mt-3 border-t border-ink/[0.08] pt-3">
                        <p className="text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                          A KNOW ME profile
                        </p>
                        <p className="display mt-0.5 text-[0.95rem] uppercase text-ink">
                          Arsene Kahunga
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="animate-float glass absolute -bottom-4 -left-4 hidden items-center gap-2 rounded-full px-3 py-2 text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-ink-soft sm:flex [animation-delay:-3s]">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden />
                    Print-ready by default
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
