import Image from "next/image";
import type { ReactNode } from "react";
import {
  ContactRound,
  Images,
  PlayCircle,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { getPhoto } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STRIP = ["14", "8", "121"];

function FeatureCard({
  icon: Icon,
  title,
  body,
  className = "",
  children,
}: {
  icon: typeof Images;
  title: string;
  body: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`glass glass-hover flex h-full flex-col rounded-[26px] p-5 sm:p-6 ${className}`}>
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/65 text-brand-blue">
          <Icon size={16} strokeWidth={1.8} aria-hidden />
        </span>
        <h3 className="text-[0.9rem] font-semibold text-ink">{title}</h3>
      </div>
      <p className="mt-3 text-[0.78rem] leading-relaxed text-ink-muted">{body}</p>
      {children && <div className="mt-auto pt-5">{children}</div>}
    </div>
  );
}

export function Features() {
  const strip = STRIP.map((id) => getPhoto(id)).filter((photo) => photo !== null);

  return (
    <section id="features" className="relative py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="What your profile includes"
          title={
            <>
              Everything that matters.{" "}
              <span className="editorial font-normal lowercase text-brand-blue">
                nothing that doesn&rsquo;t
              </span>
              <span className="text-brand-pink">.</span>
            </>
          }
          description="Each profile is assembled around the person it belongs to. These are the building blocks we bring together — never a cluttered page of borrowed widgets."
        />

        <div className="mt-10 grid gap-3 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <FeatureCard
              icon={Images}
              title="Visual storytelling, not a gallery dump"
              body="Photographs are arranged into frameless, paced chapters that move independently. Scroll away and they rest; tap any photograph to open it full screen."
            >
              <div className="flex gap-2">
                {strip.map((photo, index) => (
                  <div
                    key={photo.src}
                    className={`relative overflow-hidden rounded-xl border border-white/80 ${
                      index === 1 ? "aspect-[4/5] flex-[1.3]" : "aspect-[4/5] flex-1"
                    }`}
                  >
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 16vw, 28vw"
                      placeholder="blur"
                      blurDataURL={photo.blur}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </FeatureCard>
          </Reveal>

          <Reveal delay={0.05} className="lg:col-span-5">
            <FeatureCard
              icon={QrCode}
              title="A permanent link and print-ready QR"
              body="The QR encodes only your profile URL — never your contact details. Reprint is never needed when your profile changes."
            >
              <div className="flex items-center gap-4">
                <Image
                  src="/qr/arsene-demo.png"
                  alt="Example KNOW ME QR code"
                  width={1024}
                  height={1024}
                  className="h-32 w-32 shrink-0 rounded-xl border border-ink/5 bg-white p-1.5"
                />
                <div className="space-y-2">
                  {["PNG & SVG downloads", "High-resolution output", "Four-module quiet zone"].map(
                    (line) => (
                      <p
                        key={line}
                        className="flex items-center gap-1.5 text-[0.66rem] text-ink-soft"
                      >
                        <span className="h-1 w-1 rounded-full bg-brand-pink" aria-hidden />
                        {line}
                      </p>
                    ),
                  )}
                </div>
              </div>
            </FeatureCard>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-4">
            <FeatureCard
              icon={PlayCircle}
              title="A video wall"
              body="Your TikTok posts in a horizontal wall that plays one at a time — with honest fallbacks when a platform blocks playback."
            />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4">
            <FeatureCard
              icon={ContactRound}
              title="One-tap contact"
              body="Add to contact, email, call or WhatsApp — whichever details you choose to publish, with a clean request path for the rest."
            />
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-4">
            <FeatureCard
              icon={ShieldCheck}
              title="Privacy by default"
              body="Nothing is invented or scraped. Every platform, number and link appears only because the profile owner approved it."
            />
          </Reveal>

          <Reveal delay={0.14} className="lg:col-span-6">
            <FeatureCard
              icon={RefreshCw}
              title="Managed updates, for life"
              body="Your profile is a living document. Send a new photograph or a new role and our team keeps everything current — no editor login to remember."
            />
          </Reveal>

          <Reveal delay={0.16} className="lg:col-span-6">
            <FeatureCard
              icon={Smartphone}
              title="Built for the way people actually browse"
              body="Mobile-first layouts, lazy-loaded photographs, keyboard-accessible lightboxes and reduced-motion support come standard on every profile."
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
