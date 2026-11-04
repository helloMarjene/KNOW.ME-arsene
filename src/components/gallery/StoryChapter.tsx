"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Expand } from "lucide-react";
import type { Accent, PhotoAsset, StorySection } from "@/lib/types";
import { Lightbox } from "@/components/gallery/Lightbox";

const ACCENT: Record<
  Accent,
  { text: string; bar: string; soft: string; glow: string }
> = {
  blue: {
    text: "text-brand-blue",
    bar: "from-brand-blue to-brand-blue-bright",
    soft: "bg-brand-blue",
    glow: "bg-[radial-gradient(circle_at_18%_12%,rgba(10,28,180,0.12),transparent_55%)]",
  },
  pink: {
    text: "text-brand-pink",
    bar: "from-brand-pink to-[#ff6aa9]",
    soft: "bg-brand-pink",
    glow: "bg-[radial-gradient(circle_at_82%_8%,rgba(243,14,120,0.12),transparent_55%)]",
  },
  indigo: {
    text: "text-[#4338ca]",
    bar: "from-[#4338ca] to-[#7c6cf0]",
    soft: "bg-[#4338ca]",
    glow: "bg-[radial-gradient(circle_at_50%_0%,rgba(67,56,202,0.13),transparent_60%)]",
  },
  rose: {
    text: "text-[#c0266a]",
    bar: "from-[#c0266a] to-[#ff7aa8]",
    soft: "bg-[#c0266a]",
    glow: "bg-[radial-gradient(circle_at_20%_80%,rgba(192,38,106,0.11),transparent_58%)]",
  },
  teal: {
    text: "text-[#0f766e]",
    bar: "from-[#0f766e] to-[#4ecdc4]",
    soft: "bg-[#0f766e]",
    glow: "bg-[radial-gradient(circle_at_80%_80%,rgba(15,118,110,0.12),transparent_58%)]",
  },
};

const FRAMES = 6;

const FRAME_LAYOUT = [
  "md:left-[1%] md:top-[5%] md:h-[45%] md:w-[24%] md:-rotate-[1.4deg]",
  "md:left-[27%] md:top-[2%] md:h-[35%] md:w-[20%] md:rotate-[1.1deg]",
  "md:left-[27%] md:top-[40%] md:h-[53%] md:w-[19%] md:rotate-[0.6deg]",
  "md:left-[48%] md:top-[3%] md:h-[55%] md:w-[22%] md:-rotate-[0.8deg]",
  "md:left-[72%] md:top-[2%] md:h-[37%] md:w-[27%] md:rotate-[1.2deg]",
  "md:left-[72%] md:top-[43%] md:h-[50%] md:w-[27%] md:-rotate-[1.6deg]",
];

const MOBILE_LAYOUT = [
  "col-span-1 row-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-1",
  "col-span-1",
  "hidden md:block",
];

export function StoryChapter({
  section,
  photos,
}: {
  section: StorySection;
  photos: PhotoAsset[];
}) {
  const accent = ACCENT[section.accent];
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [indices, setIndices] = useState<number[]>(() => Array(FRAMES).fill(0));
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const frameSets = useMemo(() => {
    const sets: PhotoAsset[][] = Array.from({ length: FRAMES }, () => []);
    photos.forEach((photo, index) => sets[index % FRAMES].push(photo));
    return sets;
  }, [photos]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduceMotion || lightbox.open) return;
    const timers = frameSets.map((set, frameIndex) => {
      if (set.length < 2) return null;
      return window.setInterval(
        () => {
          setIndices((previous) => {
            const next = [...previous];
            next[frameIndex] = (next[frameIndex] + 1) % set.length;
            return next;
          });
        },
        4400 + frameIndex * 430,
      );
    });
    return () => {
      timers.forEach((timer) => {
        if (timer) window.clearInterval(timer);
      });
    };
  }, [inView, reduceMotion, lightbox.open, frameSets]);

  const openLightbox = (photo: PhotoAsset) => {
    const index = photos.findIndex((item) => item.src === photo.src);
    setLightbox({ open: true, index: Math.max(0, index) });
  };

  return (
    <section id={section.id} className="relative pb-16 sm:pb-24">
      <div className="section-shell">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-2xl gap-4">
            <span
              className={`mt-1.5 hidden h-12 w-1 shrink-0 rounded-full bg-gradient-to-b ${accent.bar} sm:block`}
              aria-hidden
            />
            <div>
              <div className="flex items-center gap-3">
                <span className="eyebrow text-ink-muted">{section.eyebrow}</span>
                <span className={`h-1 w-1 rounded-full ${accent.soft}`} aria-hidden />
                <span className="text-[0.65rem] font-semibold text-ink-muted">
                  {photos.length} photographs
                </span>
              </div>
              <h2 className="display mt-2 text-[clamp(2rem,5vw,3.4rem)] uppercase text-ink">
                {section.title}
              </h2>
              <p className={`editorial mt-1 text-[clamp(1.15rem,2.4vw,1.6rem)] ${accent.text}`}>
                {section.headline}
              </p>
              <p className="mt-3 max-w-xl text-pretty text-[0.86rem] leading-relaxed text-ink-soft sm:text-[0.9rem]">
                {section.description}
              </p>
            </div>
          </div>

          <p className="chip hidden shrink-0 sm:inline-flex">
            <Expand size={12} aria-hidden />
            Tap a photograph to open it
          </p>
        </div>

        <div ref={containerRef} className={`relative mt-7 ${accent.glow}`}>
          <div className="grid h-[27rem] grid-cols-2 auto-rows-[minmax(0,1fr)] gap-2.5 sm:h-[32rem] sm:gap-3 md:relative md:block md:h-[clamp(27rem,43vw,39rem)]">
            {frameSets.map((set, frameIndex) => {
              const photo = set[indices[frameIndex] % set.length];
              if (!photo) return null;
              const sectionIndex = photos.findIndex((item) => item.src === photo.src);
              return (
                <button
                  type="button"
                  key={`${section.id}-frame-${frameIndex}`}
                  onClick={() => openLightbox(photo)}
                  aria-label={`Open ${section.title} photograph ${sectionIndex + 1} of ${photos.length}`}
                  className={`photo-veil group relative overflow-hidden rounded-[16px] bg-ink/10 md:absolute ${MOBILE_LAYOUT[frameIndex]} ${FRAME_LAYOUT[frameIndex]} transition-transform duration-500 hover:z-10 hover:scale-[1.012]`}
                >
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={photo.src}
                      initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduceMotion ? undefined : { opacity: 0 }}
                      transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={photo.src}
                        alt={`${section.title} — Arsene Kahunga, photograph ${
                          sectionIndex + 1
                        }`}
                        fill
                        loading="lazy"
                        sizes="(min-width: 1024px) 26vw, (min-width: 768px) 24vw, 50vw"
                        placeholder="blur"
                        blurDataURL={photo.blur}
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <span
                    className="absolute inset-0 z-[2] bg-[#070b22]/0 transition-colors duration-500 group-hover:bg-[#070b22]/15"
                    aria-hidden
                  />
                  <span className="absolute bottom-2 left-2 z-10 rounded-full border border-white/25 bg-black/25 px-2 py-0.5 text-[0.52rem] font-semibold tracking-[0.16em] text-white/85 backdrop-blur-md">
                    {String(sectionIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute right-2 top-2 z-10 inline-flex h-7 w-7 translate-y-1 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Expand size={12} aria-hidden />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 px-1">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            {reduceMotion ? "Reduced motion on" : "Tap a photograph to open it"} · independent
            motion
          </p>
          <p className="hidden text-[0.58rem] uppercase tracking-[0.16em] text-ink-muted sm:block">
            Each chapter moves at its own pace
          </p>
        </div>
      </div>

      <Lightbox
        open={lightbox.open}
        photos={photos}
        startIndex={lightbox.index}
        title={section.title}
        onClose={() => setLightbox((current) => ({ ...current, open: false }))}
      />
    </section>
  );
}
