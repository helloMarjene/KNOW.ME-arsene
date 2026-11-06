"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, Images, Play, Video } from "lucide-react";
import type { TikTokItem } from "@/lib/types";
import { LogoMark } from "@/components/branding/Logo";
import { Reveal } from "@/components/ui/Reveal";

const POSTERS = [
  "bg-[radial-gradient(circle_at_30%_18%,#2c43e0_0%,transparent_58%),radial-gradient(circle_at_78%_82%,#c8177e_0%,transparent_56%)] bg-[#0b1230]",
  "bg-[radial-gradient(circle_at_72%_22%,#f30e78_0%,transparent_54%),radial-gradient(circle_at_20%_80%,#2238d8_0%,transparent_58%)] bg-[#0c0f2e]",
  "bg-[radial-gradient(circle_at_24%_78%,#4858ea_0%,transparent_56%),radial-gradient(circle_at_80%_18%,#8d1667_0%,transparent_52%)] bg-[#0a0e28]",
  "bg-[radial-gradient(circle_at_70%_78%,#d61c74_0%,transparent_55%),radial-gradient(circle_at_22%_20%,#1c2fbf_0%,transparent_56%)] bg-[#0b102c]",
];

export function VideoShowcase({
  items,
  profileUrl,
  note,
}: {
  items: TikTokItem[];
  profileUrl: string | null;
  note: string;
}) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [failedKey, setFailedKey] = useState<string | null>(null);
  const loadedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!activeKey) return;
    const key = activeKey;
    const timer = window.setTimeout(() => {
      if (loadedRef.current !== key) setFailedKey(key);
    }, 9000);
    return () => window.clearTimeout(timer);
  }, [activeKey]);

  useEffect(() => {
    if (!activeKey) return;
    const activeIndex = items.findIndex((item) => item.id === activeKey);
    if (activeIndex < 0) return;

    const timer = window.setTimeout(() => {
      const nextIndex = (activeIndex + 1) % items.length;
      loadedRef.current = null;
      setLoadedKey(null);
      setFailedKey(null);
      setActiveKey(items[nextIndex]?.id ?? null);
    }, 15_000);

    return () => window.clearTimeout(timer);
  }, [activeKey, items]);

  const loop = items.map((item) => ({ item, key: item.id }));

  return (
    <section
      id="videos"
      className="relative mt-6 overflow-hidden bg-[#070b22] py-16 text-white sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(35,56,216,0.35),transparent_55%),radial-gradient(ellipse_at_85%_85%,rgba(243,14,120,0.22),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:88px_88px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
      />

      <div className="section-shell relative">
        <Reveal>
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-[#6d7cff] to-brand-pink" />
                <span className="eyebrow text-white/55">TikTok · Short form</span>
              </div>
              <h2 className="display text-[clamp(2.3rem,5.6vw,4.4rem)] uppercase text-white">
                My <span className="editorial font-normal normal-case text-[#f7a8c9]">videos</span>
                <span className="text-brand-pink">.</span>
              </h2>
              <p className="editorial mt-2 text-[clamp(1.15rem,2.4vw,1.55rem)] text-white/65">
                Motion, in short form.
              </p>
              <p className="mt-4 max-w-xl text-pretty text-[0.82rem] leading-relaxed text-white/50">
                {note}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {profileUrl && (
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn !min-h-10 border border-white/15 bg-white/5 px-4 text-[0.72rem] text-white/85 backdrop-blur-xl transition-colors hover:bg-white/15"
                >
                  <ExternalLink size={14} aria-hidden />
                  Open TikTok
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-10 snap-x snap-mandatory overflow-x-auto overflow-y-hidden pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-14">
        <div className="fade-x">
          <div className="flex w-max gap-3 px-3 py-1 sm:gap-4 sm:px-5">
            {loop.map(({ item, key }, index) => {
              const isActive = activeKey === key;
              const isLoaded = loadedKey === key;
              return (
                <article
                  key={key}
                  onPointerEnter={() => setActiveKey(key)}
                  aria-label={`${item.label} — official TikTok ${item.kind} embed`}
                  className="w-[13.5rem] shrink-0 snap-center sm:w-[15.5rem]"
                >
                  <div className="glass-dark rounded-[26px] p-2 sm:p-2.5">
                    <div className="relative aspect-[9/16] overflow-hidden rounded-[20px] bg-[#0b102c]">
                      <div
                        className={`absolute inset-0 ${
                          POSTERS[index % POSTERS.length]
                        }`}
                        aria-hidden
                      />

                      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/20 px-2 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.16em] text-white/70 backdrop-blur-md">
                            {item.kind === "photo" ? (
                              <Images size={10} aria-hidden />
                            ) : (
                              <Video size={10} aria-hidden />
                            )}
                            {item.kind === "photo" ? "Photo post" : "Video"}
                          </span>
                          <span className="text-[0.54rem] font-semibold uppercase tracking-[0.18em] text-white/45">
                            TikTok
                          </span>
                        </div>

                        <div>
                          <LogoMark size={38} className="opacity-95" />
                          <p className="display mt-3 text-[1.3rem] uppercase tracking-[0.02em] text-white">
                            {item.label}
                          </p>
                          <p className="mt-1 text-[0.62rem] uppercase tracking-[0.16em] text-white/50">
                            Official embed
                          </p>
                        </div>
                      </div>

                      {isActive ? (
                        failedKey === key ? (
                          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#070b22]/75 p-4 text-center backdrop-blur-sm">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/80">
                              <Video size={16} aria-hidden />
                            </span>
                            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/85">
                              Player unavailable here
                            </p>
                            <p className="max-w-[13rem] text-[0.6rem] leading-relaxed text-white/55">
                              TikTok did not load its embedded player. You can still watch this
                              post directly on TikTok.
                            </p>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/25"
                            >
                              Open on TikTok
                              <ArrowUpRight size={12} aria-hidden />
                            </a>
                          </div>
                        ) : (
                          <>
                            <iframe
                              key={`${key}-embed`}
                              src={`https://www.tiktok.com/embed/v2/${item.id}?lang=en-US`}
                              title={`${item.label} — official TikTok embed`}
                              loading="lazy"
                              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                              allowFullScreen
                              referrerPolicy="strict-origin-when-cross-origin"
                              onLoad={() => {
                                loadedRef.current = key;
                                setLoadedKey(key);
                              }}
                              className={`absolute inset-0 z-10 h-full w-full transition-opacity duration-500 ${
                                isLoaded ? "opacity-100" : "opacity-0"
                              }`}
                            />
                            {!isLoaded && (
                              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#070b22]/40 text-white/70 backdrop-blur-[2px]">
                                <span className="h-7 w-7 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
                                <span className="text-[0.58rem] font-semibold uppercase tracking-[0.18em]">
                                  Loading TikTok player
                                </span>
                              </div>
                            )}
                          </>
                        )
                      ) : (
                        <button
                          type="button"
                          onClick={() => setActiveKey(key)}
                          className="absolute inset-0 z-10 flex items-center justify-center bg-[#070b22]/0 transition-colors duration-300 hover:bg-[#070b22]/15"
                          aria-label={`Load the official TikTok player for ${item.label}`}
                        >
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white shadow-lg backdrop-blur-xl transition-transform duration-300 hover:scale-105">
                            <Play size={18} aria-hidden />
                          </span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 px-1.5 pb-0.5 pt-2.5">
                      <div className="min-w-0">
                        <p className="truncate text-[0.68rem] font-semibold text-white/85">
                          {item.label}
                        </p>
                        <p className="text-[0.55rem] uppercase tracking-[0.14em] text-white/40">
                          {item.kind === "photo" ? "Carousel" : "Short video"}
                        </p>
                      </div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${item.label} on TikTok`}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/75 transition-colors hover:bg-white/20 hover:text-white"
                      >
                        <ArrowUpRight size={14} aria-hidden />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="section-shell relative mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.6rem] uppercase tracking-[0.18em] text-white/35">
          Swipe or scroll · tap a card to play it · each player stops after 15 seconds
        </p>
        <p className="text-[0.6rem] uppercase tracking-[0.18em] text-white/35">
          Autoplay is controlled by TikTok
        </p>
      </div>
    </section>
  );
}
