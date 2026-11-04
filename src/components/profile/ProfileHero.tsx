import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  ContactRound,
  Lock,
  Mail,
  MapPin,
  QrCode,
  Sparkles,
} from "lucide-react";
import type { Profile } from "@/lib/types";
import { getPhoto } from "@/lib/media";
import { profileUrl } from "@/lib/site";
import { LogoMark } from "@/components/branding/Logo";
import { HeroBackdrop } from "@/components/profile/HeroBackdrop";
import { SocialDock } from "@/components/social/SocialDock";
import { SocialIcon } from "@/components/social/SocialIcon";
import { Reveal } from "@/components/ui/Reveal";

export function ProfileHero({ profile }: { profile: Profile }) {
  const { identity, contact, socials } = profile;
  const covers = identity.coverPhotos
    .map((id) => getPhoto(id))
    .filter((photo): photo is NonNullable<typeof photo> => photo !== null);
  const url = profileUrl(profile.slug);
  const requestHref = `mailto:${contact.email ?? "hello@marjenesoftwaredev.com"}?subject=${encodeURIComponent(
    `Contact request for ${identity.fullName}`,
  )}&body=${encodeURIComponent(
    "Hi KNOW ME team, I would like to request call and WhatsApp details for this profile.",
  )}`;

  const whatsappDigits = contact.whatsapp?.replace(/\D/g, "") ?? "";
  const whatsappHref = whatsappDigits
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
        `Hi ${identity.firstName}, I found your KNOW ME profile.`,
      )}`
    : requestHref;

  return (
    <section className="relative isolate overflow-hidden pb-12 pt-8 sm:pt-12 lg:pb-20 lg:pt-14">
      {covers.length > 0 ? (
        <HeroBackdrop photos={covers} />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_28%_18%,#2a3dd4,transparent_58%),radial-gradient(circle_at_82%_76%,#f30e78,transparent_55%)] bg-ink"
        />
      )}
      <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />

      <div className="section-shell">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          <Reveal className="lg:col-span-8 lg:row-start-1" amount={0.1}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip !border-white/80 !bg-white/60 dark:!border-white/15 dark:!bg-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" aria-hidden />
                KNOW ME · Published profile
              </span>
              <span className="chip">
                <MapPin size={11} aria-hidden />
                {identity.location}
              </span>
            </div>

            <h1 className="display mt-5 text-[clamp(3.2rem,10.5vw,7.4rem)] uppercase text-ink">
              <span className="block">{identity.firstName}</span>
              <span className="block">
                {identity.fullName.split(" ").slice(1).join(" ")}
                <span className="text-brand-pink">.</span>
              </span>
            </h1>

            <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-3">
              <p className="font-semibold uppercase tracking-[0.16em] text-ink">
                {identity.title}
              </p>
              <span className="hidden h-3.5 w-px bg-ink/20 sm:block" aria-hidden />
              <a
                href={contact.website ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-ink-soft transition-colors hover:text-brand-blue"
              >
                {identity.company}
                <ArrowUpRight size={13} aria-hidden />
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {identity.positioning.map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-ink/10 bg-white/40 px-3 py-1 text-[0.68rem] font-semibold text-ink-soft backdrop-blur-md"
                >
                  {role}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal
            className="order-2 lg:order-none lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1"
            y={30}
            delay={0.08}
            amount={0.05}
          >
            <aside className="glass grain relative overflow-hidden rounded-[26px] p-4 sm:p-5">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(243,14,120,0.22),transparent_70%)] blur-2xl"
              />

              <div className="relative flex items-center gap-3">
                <Image
                  src={identity.avatar}
                  alt={`Portrait of ${identity.fullName}`}
                  width={56}
                  height={56}
                  className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-white/60"
                />
                <div className="min-w-0">
                  <p className="text-[0.52rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                    Managed profile
                  </p>
                  <p className="mt-0.5 truncate text-[0.92rem] font-semibold text-ink">
                    {identity.fullName}
                  </p>
                </div>
                <span className="ml-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/50">
                  <LogoMark size={20} />
                </span>
              </div>

              <dl className="relative mt-5 space-y-3.5 border-t border-ink/10 pt-4">
                <div>
                  <dt className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                    Role
                  </dt>
                  <dd className="mt-0.5 flex items-start gap-2 text-[0.8rem] font-semibold text-ink">
                    <Sparkles size={13} className="mt-0.5 shrink-0 text-brand-pink" aria-hidden />
                    {identity.title}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                    Company
                  </dt>
                  <dd className="mt-0.5 flex items-start gap-2 break-words text-[0.8rem] text-ink">
                    <Building2 size={13} className="mt-0.5 shrink-0 text-brand-blue" aria-hidden />
                    {identity.company}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                    Based in
                  </dt>
                  <dd className="mt-0.5 flex items-start gap-2 text-[0.8rem] text-ink">
                    <MapPin size={13} className="mt-0.5 shrink-0 text-brand-pink" aria-hidden />
                    {identity.location}
                  </dd>
                </div>
              </dl>

              <a
                href="#share"
                className="relative mt-4 flex items-center gap-2 rounded-2xl border border-white/60 bg-white/40 px-3 py-2.5 text-[0.7rem] font-semibold text-ink-soft transition-colors hover:bg-white/70 hover:text-ink"
              >
                <QrCode size={15} className="shrink-0 text-brand-blue" aria-hidden />
                <span className="min-w-0 flex-1 truncate">{url.replace(/^https?:\/\//, "")}</span>
                <ArrowUpRight size={12} className="shrink-0 opacity-50" aria-hidden />
              </a>

              <p className="relative mt-4 border-t border-ink/10 pt-3.5">
                <span className="editorial text-[1.45rem] leading-tight text-ink">
                  &ldquo;{identity.tagline}&rdquo;
                </span>
              </p>
            </aside>
          </Reveal>

          <Reveal
            className="order-3 lg:order-none lg:col-span-8 lg:row-start-2"
            delay={0.12}
          >
            <div className="mt-2 max-w-xl lg:mt-8">
              <p className="text-pretty text-[0.95rem] leading-relaxed text-ink-soft sm:text-[1.02rem]">
                {identity.intro[0]}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <a
                  href={`/api/vcard/${profile.slug}`}
                  className="btn btn-primary"
                  download
                >
                  <ContactRound size={16} aria-hidden />
                  Add to contact
                </a>

                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="btn btn-glass"
                    aria-label={`Email ${identity.firstName}`}
                  >
                    <Mail size={16} aria-hidden />
                    Email
                  </a>
                )}

                <a
                  href={whatsappHref}
                  className="btn btn-glass"
                  title={whatsappDigits ? "WhatsApp" : "WhatsApp — details shared on request"}
                  aria-label={
                    whatsappDigits
                      ? `Chat with ${identity.firstName} on WhatsApp`
                      : `Request WhatsApp details for ${identity.firstName} by email`
                  }
                  {...(whatsappDigits
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <SocialIcon platform="whatsapp" size={15} colored />
                  WhatsApp
                </a>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <SocialDock socials={socials} url={url} name={identity.fullName} />
                <Link
                  href="#about"
                  className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-ink-muted transition-colors hover:text-brand-blue"
                >
                  Read the full introduction
                  <ArrowDown size={13} aria-hidden />
                </Link>
              </div>

              <p className="mt-5 inline-flex items-center gap-1.5 text-[0.65rem] leading-relaxed text-ink-muted">
                <Lock size={11} aria-hidden />
                Direct call and WhatsApp details are shared on request. No number is published
                without consent.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-ink/10 pt-5 lg:mt-16">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
            One person · One profile · One link · One QR
          </p>
          <Link
            href="#story"
            className="group inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-brand-pink"
          >
            Explore the story
            <ArrowDown
              size={13}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
