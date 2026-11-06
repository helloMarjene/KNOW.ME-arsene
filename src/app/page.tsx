import { notFound } from "next/navigation";
import { getProfile } from "@/lib/profiles";
import { profileUrl, SITE } from "@/lib/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProfileHero } from "@/components/profile/ProfileHero";
import { ProfileManifesto } from "@/components/profile/ProfileManifesto";
import { StoryShowcase } from "@/components/gallery/StoryShowcase";
import { VideoShowcase } from "@/components/video/VideoShowcase";
import { TimelineSection } from "@/components/timeline/TimelineSection";
import { ServicesSection } from "@/components/profile/ServicesSection";
import { ProjectsSection } from "@/components/profile/ProjectsSection";
import { WorkCta } from "@/components/profile/WorkCta";
import { ConnectSection } from "@/components/profile/ConnectSection";
import { ContactDock } from "@/components/profile/ContactDock";
import { QrShare } from "@/components/profile/QrShare";

export default function Home() {
  const profile = getProfile("arsene");
  if (!profile) notFound();

  const url = profileUrl(profile.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.identity.fullName,
    jobTitle: profile.identity.title,
    description: profile.seo.description,
    url,
    image: `${SITE.url}${profile.identity.avatar}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.identity.location,
    },
    worksFor: {
      "@type": "Organization",
      name: profile.identity.company,
      url: profile.contact.website ?? SITE.company.website,
    },
    sameAs: profile.socials
      .map((social) => social.href)
      .filter((href) => href.startsWith("http")),
    mainEntityOfPage: url,
  };

  return (
    <>
      <SiteHeader
        label="Published profile"
        links={[
          { label: "Story", href: "#story" },
          { label: "Videos", href: "#videos" },
          { label: "Timeline", href: "#timeline" },
          { label: "Projects", href: "#projects" },
          { label: "Connect", href: "#connect" },
        ]}
        cta={{ label: "Work with us", href: profile.cta.href }}
      />

      <main id="main">
        <ProfileHero profile={profile} />
        <ProfileManifesto profile={profile} />
        <StoryShowcase profile={profile} />
        <VideoShowcase
          items={profile.videos.items}
          profileUrl={profile.videos.profileUrl}
          note={profile.videos.note}
        />
        <TimelineSection timeline={profile.timeline} />
        <ServicesSection profile={profile} />
        <ProjectsSection profile={profile} />
        <WorkCta profile={profile} />
        <ConnectSection profile={profile} />
        <QrShare profile={profile} />
      </main>

      <SiteFooter
        profileName={profile.identity.firstName}
        links={[
          { label: "Back to KNOW ME", href: "/" },
          { label: "Visual story", href: "#story" },
          { label: "TikTok videos", href: "#videos" },
          { label: "Projects", href: "#projects" },
          { label: "QR & sharing", href: "#share" },
        ]}
      />

      <ContactDock profile={profile} />
      <div
        aria-hidden
        className="h-[calc(5.5rem+env(safe-area-inset-bottom))] sm:h-20"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}