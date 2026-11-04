import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lock, QrCode, Sparkles } from "lucide-react";
import { getPhoto } from "@/lib/media";
import { SITE } from "@/lib/site";
import { LogoMark } from "@/components/branding/Logo";
import { Reveal } from "@/components/ui/Reveal";

const STATS = [
  ["One link", "A permanent home for your identity"],
  ["One QR", "Print it, share it, scan it"],
  ["No app", "It opens in any browser"],
  ["Fully managed", "Designed and published by our team"],
];

export function HomeHero() {
  const cover = getPhoto("107");
  const secondary = getPhoto("69");

  return (
    <section className="relative pb-8 pt-8 sm:pt-12 lg:pb-14 lg:pt-16">
      <div className="section-shell">
        <div className="grid items-center gap-11 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip !border-white/80 !bg-white/60 dark:!border-white/15 dark:!bg-white/10">
                  <LogoMark size={14} />
                  A M.A.R.J.E.N.E product
                </span>
                <span className="chip">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" aria-hidden />
                  Digital identity, redesigned
                </span>
              </div>

              <h1 className="display mt-6 max-w-[13ch] text-[clamp(2.8rem,7.4vw,5.7rem)] text-ink">
                Your entire{" "}
                <span className="editorial font-normal text-brand-blue">identity</span>
                <span className="text-brand-pink">.</span>{" "}
                <span className="block">One digital experience.</span>
              </h1>

              <p className="mt-6 max-w-xl text-pretty text-[0.98rem] leading-relaxed text-ink-soft sm:text-[1.05rem]">
                Don&rsquo;t just exchange contacts. Let people discover you — your story, your work,
                your photographs and every way to reach you, gathered into one beautifully
                considered profile.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <Link href={`/${SITE.demoSlug}`} className="btn btn-primary">
                  Explore a KNOW ME profile
                  <ArrowUpRight size={15} aria-hidden />
                </Link>
                <a
                  href={`mailto:${SITE.company.email}?subject=${encodeURIComponent(
                    "Create my KNOW ME profile",
                  )}`}
                  className="btn btn-glass"
                >
                  <Sparkles size={15} aria-hidden />
                  Create my KNOW ME profile
                </a>
              </div>

              <p className="mt-5 inline-flex items-start gap-2 text-[0.68rem] leading-relaxed text-ink-muted">
                <Lock size={12} className="mt-0.5 shrink-0" aria-hidden />
                Every profile is designed, published and maintained by the KNOW ME team. There is
                no public sign-up — just a conversation.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-9 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {STATS.map(([value, label]) => (
                <div key={value} className="glass rounded-2xl px-3.5 py-3">
                  <p className="text-[0.7rem] font-semibold text-ink">{value}</p>
                  <p className="mt-0.5 text-[0.62rem] leading-snug text-ink-muted">{label}</p>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal className="relative lg:col-span-5" y={34} delay={0.1} amount={0.05}>
            <div className="relative mx-auto w-full max-w-[23rem] lg:max-w-none">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[46px] bg-[conic-gradient(from_160deg,rgba(10,28,180,0.2),rgba(243,14,120,0.16),rgba(10,28,180,0.2))] blur-2xl"
              />

              <div className="glass group relative rounded-[34px] p-2.5 transition-transform duration-700 hover:rotate-0 lg:rotate-[1.1deg]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-ink/10">
                  {cover && (
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 34vw, 92vw"
                      placeholder="blur"
                      blurDataURL={cover.blur}
                      className="object-cover object-[50%_30%] transition-transform duration-[1200ms] group-hover:scale-[1.025]"
                    />
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#070b22]/78 via-transparent to-[#070b22]/10"
                  />

                  <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 py-1.5 pl-2 pr-3 text-white backdrop-blur-xl">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7df0bb]" aria-hidden />
                    <span className="text-[0.52rem] font-semibold uppercase tracking-[0.2em]">
                      Live profile
                    </span>
                  </div>

                  <div className="absolute inset-x-3 bottom-3">
                    <div className="glass-dark rounded-2xl px-4 py-3.5 text-white">
                      <p className="text-[0.52rem] font-semibold uppercase tracking-[0.22em] text-white/50">
                        {SITE.demoSlug}.know-me
                      </p>
                      <p className="display mt-1 text-[1.5rem] uppercase leading-none">
                        Arsene Kahunga
                      </p>
                      <p className="mt-1.5 text-[0.68rem] text-white/60">
                        Founder &amp; Software Developer
                      </p>
                      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5">
                        <span className="text-[0.55rem] uppercase tracking-[0.16em] text-white/45">
                          Kampala, Uganda
                        </span>
                        <span className="inline-flex items-center gap-1 text-[0.55rem] uppercase tracking-[0.16em] text-white/60">
                          <LogoMark size={14} />
                          KNOW ME
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {secondary && (
                <div className="animate-float absolute -left-5 bottom-[18%] hidden w-24 rotate-[-7deg] rounded-[18px] border-[3px] border-white/75 shadow-2xl sm:block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[14px]">
                    <Image
                      src={secondary.src}
                      alt="A second frame from Arsene's profile"
                      fill
                      sizes="96px"
                      placeholder="blur"
                      blurDataURL={secondary.blur}
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="animate-float glass absolute -right-4 top-[14%] hidden w-28 rounded-[20px] p-2.5 sm:block [animation-delay:-5s]">
                <Image
                  src="/qr/arsene-demo.png"
                  alt="QR code for Arsene's KNOW ME profile"
                  width={1024}
                  height={1024}
                  className="h-auto w-full rounded-lg bg-white"
                />
                <p className="mt-2 inline-flex items-center gap-1 text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  <QrCode size={10} aria-hidden />
                  Scan to discover
                </p>
              </div>

              <div className="animate-float absolute -bottom-3 right-8 hidden items-center gap-2 rounded-full border border-white/70 bg-white/65 px-3 py-2 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-ink-soft shadow-lg backdrop-blur-xl sm:flex [animation-delay:-2.5s]">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" aria-hidden />
                One person · one profile
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
