import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HomeHero } from "@/components/home/HomeHero";
import { PhotoMarquee } from "@/components/home/PhotoMarquee";
import { WhatIs } from "@/components/home/WhatIs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ProfileShowcase } from "@/components/home/ProfileShowcase";
import { StoryDemo } from "@/components/home/StoryDemo";
import { Features } from "@/components/home/Features";
import { SocialSection } from "@/components/home/SocialSection";
import { QrShowcase } from "@/components/home/QrShowcase";
import { AudienceSection } from "@/components/home/AudienceSection";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "KNOW ME — Your Identity. Your Story. Your Connection.",
  description:
    "KNOW ME is a centrally managed digital identity experience. One person, one beautifully designed profile, one permanent link and one print-ready QR code. A product of M.A.R.J.E.N.E Software Development.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "KNOW ME — Your entire identity. One digital experience.",
    description:
      "A designed digital identity for people whose name arrives before they do. Photography, story, work and every way to connect — in one managed profile.",
    url: "/",
    images: [
      {
        url: "/branding/og-arsene.jpg",
        width: 1200,
        height: 630,
        alt: "KNOW ME — Arsene Kahunga, Founder & Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KNOW ME — Your entire identity. One digital experience.",
    description:
      "One managed profile for your story, your photographs, your work and every way to connect.",
    images: ["/branding/og-arsene.jpg"],
  },
};

const emailHref = `mailto:${SITE.company.email}?subject=${encodeURIComponent(
  "Create my KNOW ME profile",
)}`;

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description:
          "A centrally managed digital identity experience by M.A.R.J.E.N.E Software Development.",
        publisher: { "@id": `${SITE.url}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.company.name,
        alternateName: SITE.company.shortName,
        url: SITE.company.website,
        slogan: SITE.company.tagline,
        email: SITE.company.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kampala",
          addressCountry: "UG",
        },
        brand: {
          "@type": "Brand",
          name: SITE.name,
          slogan: SITE.tagline,
        },
      },
    ],
  };

  return (
    <>
      <SiteHeader
        links={[
          { label: "What it is", href: "#idea" },
          { label: "How it works", href: "#how" },
          { label: "The profile", href: "#profiles" },
          { label: "Included", href: "#features" },
          { label: "FAQ", href: "#faq" },
        ]}
        cta={{ label: "Create my profile", href: emailHref }}
      />

      <main id="main">
        <HomeHero />
        <PhotoMarquee />
        <WhatIs />
        <HowItWorks />
        <ProfileShowcase />
        <StoryDemo />
        <Features />
        <SocialSection />
        <QrShowcase />
        <AudienceSection />
        <Faq />
        <FinalCta />
      </main>

      <SiteFooter
        links={[
          { label: "Arsene's live profile", href: "/arsene" },
          { label: "How it works", href: "/#how" },
          { label: "What's included", href: "/#features" },
          { label: "Print & share", href: "/arsene#share" },
          { label: "FAQ", href: "/#faq" },
        ]}
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
