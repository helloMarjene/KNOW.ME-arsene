import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Compass, Mic, Palette } from "lucide-react";
import { getPhoto } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const AUDIENCES = [
  {
    icon: Briefcase,
    title: "Founders & operators",
    body: "Put a face and a story behind the company. Give investors, partners and hires somewhere real to land.",
    photo: "30",
  },
  {
    icon: Palette,
    title: "Creatives & performers",
    body: "Let the work lead. Photographs, video and personality in one place instead of scattered across apps.",
    photo: "115",
  },
  {
    icon: Compass,
    title: "Consultants & coaches",
    body: "Build trust before the first call. Show how you think, what you offer and how to begin.",
    photo: "68",
  },
  {
    icon: Mic,
    title: "Public-facing professionals",
    body: "Speakers, community leaders and anyone whose name arrives before they do. Be discoverable on your terms.",
    photo: "120",
  },
];

export function AudienceSection() {
  return (
    <section id="who" className="relative py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Who it's for"
          title={
            <>
              If your name opens doors,{" "}
              <span className="editorial font-normal lowercase text-brand-blue">
                give it a home
              </span>
              <span className="text-brand-pink">.</span>
            </>
          }
          description="KNOW ME is built for people whose reputation travels ahead of them — and who want that first impression to be accurate, beautiful and theirs."
          action={
            <Link
              href="/arsene"
              className="group inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-brand-blue"
            >
              See the flagship example
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          }
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map(({ icon: Icon, title, body, photo: id }, index) => {
            const photo = getPhoto(id);
            return (
              <Reveal key={title} delay={0.05 * index}>
                <article className="glass glass-hover group h-full overflow-hidden rounded-[26px]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {photo && (
                      <Image
                        src={photo.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 44vw, 92vw"
                        placeholder="blur"
                        blurDataURL={photo.blur}
                        className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                      />
                    )}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[#070b22]/55 via-transparent to-transparent"
                    />
                    <span className="absolute bottom-2.5 left-2.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-xl">
                      <Icon size={15} strokeWidth={1.8} aria-hidden />
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="display text-[1.02rem] uppercase leading-tight text-ink">
                      {title}
                    </h3>
                    <p className="mt-2 text-[0.76rem] leading-relaxed text-ink-muted">{body}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-6">
          <p className="text-center text-[0.62rem] uppercase tracking-[0.18em] text-ink-muted">
            Photography shown from Arsene&rsquo;s profile · every profile is built around its own person
          </p>
        </Reveal>
      </div>
    </section>
  );
}
