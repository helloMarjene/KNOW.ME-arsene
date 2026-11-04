import type { Profile } from "@/lib/types";
import { getPhoto } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { StoryChapter } from "@/components/gallery/StoryChapter";

export function StoryShowcase({ profile }: { profile: Profile }) {
  const { story } = profile;

  return (
    <div id="story" className="relative">
      <div className="section-shell pb-12 sm:pb-16">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-brand-blue to-brand-pink" />
                <span className="eyebrow text-ink-muted">{story.eyebrow}</span>
              </div>
              <h2 className="display text-balance text-[clamp(2.2rem,5.4vw,4.2rem)] uppercase text-ink">
                {story.title.replace(/FRAMES$/i, "")}
                <span className="editorial font-normal normal-case text-brand-blue">frames</span>
                <span className="text-brand-pink">.</span>
              </h2>
              <p className="editorial mt-3 text-[clamp(1.2rem,2.6vw,1.75rem)] text-ink-soft">
                {story.headline}
              </p>
              <p className="mt-4 max-w-xl text-pretty text-[0.9rem] leading-relaxed text-ink-soft">
                {story.description}
              </p>
            </div>

            <div className="glass shrink-0 rounded-2xl px-4 py-3 text-[0.7rem] leading-relaxed text-ink-soft">
              <p className="font-semibold text-ink">Five independent chapters</p>
              <p className="mt-1 text-ink-muted">
                Tap any photograph to open it full screen.
                <br />
                Every chapter moves at its own pace.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {story.sections.map((section) => {
        const photos = section.photos
          .map((id) => getPhoto(id))
          .filter((photo): photo is NonNullable<typeof photo> => photo !== null);
        if (photos.length === 0) return null;
        return <StoryChapter key={section.id} section={section} photos={photos} />;
      })}
    </div>
  );
}
