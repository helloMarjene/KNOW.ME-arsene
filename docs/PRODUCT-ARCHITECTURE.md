# Product & architecture

## What KNOW ME is

A managed digital-identity product. The KNOW ME team designs and publishes a profile on behalf of a person; the person shares one permanent URL and one QR code. There is deliberately no registration, no client login, no client dashboard, no subscription flow and no self-editing surface in this application. The public site advertises the service and demonstrates it with the flagship Arsene Kahunga profile.

## Rendering model

| Concern | Approach |
| --- | --- |
| Framework | Next.js App Router, React Server Components by default |
| Profile pages | Static generation via `generateStaticParams`; `dynamicParams = false` |
| Homepage | Static server-rendered marketing page |
| Profile content | Validated from JSON at build/request time; memoized per slug |
| vCard | Route handler at `/api/vcard/[slug]` generated from profile data |
| QR downloads | Generated in the browser with the `qrcode` package (PNG 2048px + SVG) |
| Images | `next/image` with AVIF/WebP, `sizes`, blur placeholders, lazy loading |

`next.config.ts` traces `src/data/profiles/**/*.json` into the serverless output, so profiles resolve on Vercel even though JSON is read with `fs`.

## Route map

```
/                         marketing homepage
/arsene                   flagship published profile
/<slug>                   any published profile JSON
/api/vcard/<slug>         vCard download (text/vcard attachment)
/robots.txt               generated
/sitemap.xml              generated from published profiles
```

## Page composition

### Homepage (`src/app/page.tsx`)

HomeHero → PhotoMarquee → WhatIs → HowItWorks → ProfileShowcase → StoryDemo → Features → SocialSection → QrShowcase → AudienceSection → Faq → FinalCta → SiteFooter.

The homepage is an advertisement for the service, not a generic portfolio template: it explains one person / one profile / one link / one QR, shows a live profile preview, demonstrates the independent-motion photo chapters, and makes the managed-service boundary explicit.

### Profile (`src/app/[slug]/page.tsx`)

ProfileHero → ProfileManifesto → StoryShowcase (five chapters) → VideoShowcase → TimelineSection → ServicesSection → ProjectsSection → WorkCta → ConnectSection → QrShare → SiteFooter → ContactDock.

- **Hero** — rotating full-bleed cover photographs behind a legibility scrim (7s crossfade, reduced-motion safe), name, positioning, intro, primary actions, colored social dock and a glass identity card with role, company, location and permanent URL.
- **Story** — five optional chapters, each with independent crossfades, IntersectionObserver pause/resume, tap-to-open lightbox, lazy loading and reduced-motion support. Photographs are frameless: rounded image edges, white/dark gradient veils, no cards.
- **Videos** — official TikTok embeds in a looping horizontal slider, one active player at a time, pause/resume control, posters as an honest fallback, and links out to TikTok. The app does not claim embedding support where the platform or browser prevents it.
- **Timeline** — only confirmed chapters and periods from the profile JSON. No invented dates. Optional birthday display/countdown is driven by the JSON and can remain hidden.
- **Services / Projects** — seven services and seven named projects from the content file, with statuses limited to *Active company*, *In development* and *Exploration*. Unreleased work is never presented as commercially available.
- **Connect** — only published channels. Email is live; phone/WhatsApp remain “shared on request” unless explicitly published. No fabricated numbers.
- **QR & share** — permanent profile URL, copy link, high-resolution PNG and vector SVG downloads with a four-module quiet zone and error-correction level H. Contact details are never encoded.
- **ContactDock** — fixed Add contact / WhatsApp / Email bar with iOS safe-area padding; hidden where no valid action exists.

## Content pipeline

```
Supplied photographs
  → scripts/prepare-media.mjs
  → public/images/arsene/arsene-*.jpg (optimized)
  → src/data/photo-library.json (src, width, height, alt, blurDataURL)
  → profile JSON references photo IDs
  → lib/media.ts resolves IDs for components
```

The photo library currently contains 101 optimized photographs. Story chapters select subsets by ID; the same library also powers the homepage marquee and preview cards.

`scripts/process-brand.mjs` produces the wordmark, logo mark, social preview and app icons from the supplied KNOW ME logo.

## Theme and motion

- Theme is set on `<html data-theme="light|dark">` by a no-flash inline script before paint.
- The page always opens in dark mode for new visitors, regardless of the operating-system preference. An explicit choice is persisted in `localStorage` under `know-me-theme`.
- `ThemeToggle` updates the attribute, `color-scheme`, and all `theme-color` meta tags.
- Scroll reveals use Framer Motion (`opacity`, `y`, blur) with a 0.9s ease-out; `prefers-reduced-motion` shortens/disables transforms and collage crossfades.
- Ambient gradients, float and marquee motion are CSS-only so they remain cheap and respect reduced-motion.

## Accessibility

- Skip link, semantic landmarks, one `h1` per page, visible focus rings.
- Lightbox is keyboard-operable (Escape, arrows) and traps focus in a dialog.
- Collage photographs are buttons with descriptive labels; modal images carry real alt text.
- Contrast checked in both themes; brand marks sit on forced white tiles where their official colors require it.
- Motion-reduce fallbacks for marquees, collage crossfades, reveals and the video slider.
- Horizontal overflow is clipped at the document level; measured `scrollWidth` equals viewport width at 1440px and 390px.

## SEO & metadata

- Metadata base, canonical URLs, Open Graph and Twitter cards for both site and profile.
- `Person` JSON-LD on profiles (name, role, location, company, sameAs, mainEntityOfPage).
- Generated sitemap includes published profiles only; unpublished profiles are excluded and not routable.
- OG image is 1200×630; profile OG can be overridden per profile via `seo.ogImage`.

## Privacy & honesty boundaries

- No analytics or tracking scripts are bundled.
- No contact data is encoded into QR codes or exposed beyond what the profile owner approved.
- Unsupported TikTok playback and unconfirmed projects are stated plainly rather than simulated.
- Personal information, project completion claims and social accounts must be sourced from the supplied brief before publication.
