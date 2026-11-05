import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Play, Sparkles } from "lucide-react";
import { getPhoto } from "@/lib/media";
import { LogoMark } from "@/components/branding/Logo";
import { Reveal } from "@/components/ui/Reveal";

const FACTS = [
  ["05", "Visual chapters"],
  ["100+", "Photographs"],
  ["07", "TikTok posts"],
  ["01", "Permanent link"],
];

export function ProfileShowcase() {
  const cover = getPhoto("107");
  const inset = getPhoto("30");
  const detail = getPhoto("120");
  const storyTile = getPhoto("131");

  return (
    <section id="profiles" className="relative py-16 sm:py-24">
      <div className="section-shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-ink p-2.5 shadow-[0_50px_120px_-60px_rgba(9,14,55,0.9)] sm:rounded-[40px] sm:p-3">
            {cover && (
              <Image
                src={cover.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 82rem, 100vw"
                placeholder="blur"
                blurDataURL={cover.blur}
                className="object-cover object-[50%_28%] opacity-[0.32]"
              />
            )}
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(115deg,rgba(7,11,34,0.96)_8%,rgba(7,11,34,0.82)_46%,rgba(7,11,34,0.44)_100%)]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_88%_18%,rgba(243,14,120,0.28),transparent_45%),radial-gradient(circle_at_12%_92%,rgba(27,49,224,0.32),transparent_50%)]"
            />

            <div className="relative grid gap-10 p-5 sm:p-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14 lg:p-12">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7df0bb]" aria-hidden />
                    Live flagship profile
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/60 backdrop-blur-xl">
                    <LogoMark size={13} />
                    KNOW ME
                  </span>
                </div>

                <p className="mt-7 text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-white/45">
                  /arsene
                </p>
                <h2 className="display mt-2 text-[clamp(2.4rem,6vw,4.4rem)] uppercase leading-[0.9] text-white">
                  Arsene
                  <br />
                  Kahunga
                  <span className="text-brand-pink">.</span>
                </h2>
                <p className="editorial mt-3 text-[clamp(1.15rem,2.6vw,1.6rem)] text-white/70">
                  Founder. Software developer. Product builder.
                </p>
                <p className="mt-4 max-w-lg text-[0.88rem] leading-relaxed text-white/60">
                  A complete example of what a KNOW ME profile can hold — five photo chapters, a
                  TikTok wall, an honest timeline, the work he builds and every published way to
                  connect.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-2 text-[0.62rem] uppercase tracking-[0.16em] text-white/50">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={12} aria-hidden />
                    Kampala, Uganda
                  </span>
                  <span className="h-1 w-1 rounded-full bg-white/25" aria-hidden />
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles size={12} aria-hidden />
                    M.A.R.J.E.N.E
                  </span>
                </div>

                <Link
                  href="/arsene"
                  className="btn btn-glass group mt-7"
                >
                  Explore the full profile
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>

                <dl className="mt-9 grid max-w-lg grid-cols-2 gap-x-4 gap-y-4 border-t border-white/10 pt-6 sm:grid-cols-4">
                  {FACTS.map(([value, label]) => (
                    <div key={label}>
                      <dt className="text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                        {label}
                      </dt>
                      <dd className="display mt-1 text-[1.5rem] leading-none text-white">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
                <div
                  aria-hidden
                  className="absolute -inset-5 rounded-[42px] bg-[conic-gradient(from_140deg,rgba(27,49,224,0.5),rgba(243,14,120,0.4),rgba(27,49,224,0.5))] opacity-40 blur-2xl"
                />

                <div className="relative rotate-[-1.2deg] rounded-[26px] border border-white/15 bg-white/[0.07] p-2.5 backdrop-blur-xl transition-transform duration-700 hover:rotate-0">
                  <div className="grid aspect-[4/5] grid-cols-5 grid-rows-6 gap-2">
                    {detail && (
                      <div className="relative col-span-3 row-span-4 overflow-hidden rounded-[18px]">
                        <Image
                          src={detail.src}
                          alt="Arsene photographed in Kampala"
                          fill
                          sizes="(min-width: 1024px) 22vw, 60vw"
                          placeholder="blur"
                          blurDataURL={detail.blur}
                          className="object-cover"
                        />
                        <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full border border-white/25 bg-black/30 px-2 py-1 text-[0.48rem] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
                          <Play size={9} fill="currentColor" aria-hidden />
                          Motion wall
                        </span>
                      </div>
                    )}
                    {inset && (
                      <div className="relative col-span-2 row-span-3 overflow-hidden rounded-[18px]">
                        <Image
                          src={inset.src}
                          alt="A frame from Arsene's visual story"
                          fill
                          sizes="(min-width: 1024px) 12vw, 34vw"
                          placeholder="blur"
                          blurDataURL={inset.blur}
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="relative col-span-2 row-span-3 overflow-hidden rounded-[18px] border border-white/15 bg-white/[0.08]">
                      {storyTile && (
                        <Image
                          src={storyTile.src}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 12vw, 34vw"
                          placeholder="blur"
                          blurDataURL={storyTile.blur}
                          className="object-cover object-[50%_22%] opacity-80"
                        />
                      )}
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-[#070b22]/90 via-[#070b22]/35 to-[#070b22]/10"
                      />
                      <div className="relative flex h-full flex-col justify-between p-3">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-md">
                          <LogoMark size={17} />
                        </span>
                        <div>
                          <p className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-white/60">
                            Visual story
                          </p>
                          <p className="mt-0.5 text-[0.72rem] font-semibold leading-snug text-white">
                            Five chapters, one identity.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-3 row-span-2 flex flex-col justify-center gap-1.5 rounded-[18px] border border-white/15 bg-white/[0.08] p-2 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-3">
                      <div className="order-2 min-w-0 sm:order-1">
                        <p className="text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-white/50">
                          Public link
                        </p>
                        <p className="mt-0.5 text-[0.62rem] font-semibold leading-snug text-white sm:text-[0.72rem]">
                          <span className="inline-block">knowme-arsene</span><span className="inline-block">.vercel.app</span><span className="inline-block">/arsene</span>
                        </p>
                      </div>
                      <Image
                        src="/qr/arsene-demo.png"
                        alt=""
                        width={1024}
                        height={1024}
                        className="order-1 h-9 w-9 shrink-0 rounded-md bg-white p-0.5 sm:order-2 sm:h-16 sm:w-16 sm:rounded-lg sm:p-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-3 hidden items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-2 text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-xl sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" aria-hidden />
                  Managed profile
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
