import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { getPhoto } from "@/lib/media";

const IDS = ["107", "69", "30", "122", "115", "121", "49", "132", "120", "102", "94", "133"];

export function PhotoMarquee() {
  const strip = [...IDS, ...IDS];

  return (
    <section className="relative pb-14 pt-2 sm:pb-20">
      <div className="section-shell flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow text-ink-muted">From the flagship profile</p>
          <p className="mt-1 text-[0.8rem] text-ink-soft">
            A glimpse of the photographs inside Arsene&rsquo;s KNOW ME.
          </p>
        </div>
        <Link
          href="/arsene#story"
          className="group inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-brand-blue"
        >
          See the full story
          <ArrowRight
            size={13}
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>

      <div className="marquee fade-x mt-5 overflow-hidden" data-paused="false">
        <div
          className="marquee-track gap-2.5 px-3 sm:gap-3.5"
          style={{ "--marquee-duration": "90s" } as CSSProperties}
        >
          {strip.map((id, index) => {
            const photo = getPhoto(id);
            if (!photo) return null;
            return (
              <figure
                key={`${id}-${index}`}
                className={`photo-veil relative h-36 w-28 shrink-0 overflow-hidden rounded-[14px] sm:h-48 sm:w-36 ${
                  index % 3 === 0 ? "rotate-[1.2deg]" : index % 3 === 1 ? "-rotate-[1.2deg]" : ""
                }`}
              >
                <Image
                  src={photo.src}
                  alt="Photograph from Arsene Kahunga's KNOW ME profile"
                  fill
                  loading="lazy"
                  sizes="(min-width: 640px) 144px, 112px"
                  placeholder="blur"
                  blurDataURL={photo.blur}
                  className="object-cover"
                />
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
