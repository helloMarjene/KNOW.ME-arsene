import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { StorySection } from "@/lib/types";
import { getPhoto } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { StoryChapter } from "@/components/gallery/StoryChapter";

const DEMO: StorySection = {
  id: "story-demo",
  eyebrow: "Live from /arsene",
  title: "Portrait frames",
  headline: "This is what a chapter feels like.",
  description:
    "Six frames run independently inside every chapter. Scroll away and the motion pauses; pause it yourself and it waits. Tap any frame to open the full-size photograph.",
  accent: "blue",
  photos: ["1", "3", "4", "5", "6", "8", "9", "10", "11", "14", "16", "17"],
};

export function StoryDemo() {
  const photos = DEMO.photos
    .map((id) => getPhoto(id))
    .filter((photo): photo is NonNullable<typeof photo> => photo !== null);

  return (
    <div id="inside" className="relative py-16 sm:py-24">
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-ink/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-brand-blue to-brand-pink" />
              <span className="eyebrow text-ink-muted">Inside a KNOW ME profile</span>
            </div>

            <Link
              href="/arsene#story"
              className="group inline-flex shrink-0 items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-brand-blue"
            >
              Browse all five chapters
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="pt-6">
        <StoryChapter section={DEMO} photos={photos} />
      </div>
    </div>
  );
}
