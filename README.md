# KNOW ME

**Your Identity. Your Story. Your Connection.**

KNOW ME is a centrally managed digital identity platform by **M.A.R.J.E.N.E Software Development** (“We build. You grow.”). Every profile is designed, published and maintained by the KNOW ME team — there is no public sign-up, no client dashboard and no self-service editing. A person gets one permanent link, one considered profile and one QR code that keeps working when the content changes.

The flagship profile in this repository is **Arsene Kahunga**, Founder & Software Developer at M.A.R.J.E.N.E Software Development, published at `/arsene`.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 with an `@theme` token layer and `data-theme` dark mode
- Framer Motion for scroll reveals; CSS keyframes for ambient motion
- `qrcode` for on-demand PNG/SVG profile QR codes
- `simple-icons` for official brand marks (tools and social platforms)
- JSON profile content + a generated photo library; profile pages are statically rendered

## Run locally

Requires Node.js 20.9+ (Node 24 is used in development).

```bash
npm install
npm run dev       # http://localhost:3000
npm run lint
npm run build
npm run start
```

The canonical public origin is `https://knowme-arsene.vercel.app`, defined as `SITE.url` in `src/lib/site.ts`. It is used for canonical URLs, Open Graph URLs, the sitemap and the QR code encoded on the profile. Update it there if the production domain changes.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | KNOW ME marketing homepage, live profile preview, story demo, QR demo |
| `/arsene` | Arsene Kahunga’s published profile |
| `/<slug>` | Any valid profile in `src/data/profiles/` (statically generated) |
| `/api/vcard/<slug>` | Downloadable vCard generated from published contact fields |
| `/robots.txt`, `/sitemap.xml` | Crawler metadata |
| `/qr/arsene-demo.png` | Print-ready demo QR on the homepage |

Unknown or unpublished slugs return the custom 404 page.

## Content model

Profiles live in [`src/data/profiles/arsene.json`](src/data/profiles/arsene.json) and are validated defensively by [`src/lib/profiles.ts`](src/lib/profiles.ts). The photo library is generated into [`src/data/photo-library.json`](src/data/photo-library.json) from the supplied photo set.

Rules the app enforces or follows:

- No invented dates, phone numbers, accounts, testimonials or completed projects.
- Social icons render only for links that exist in the profile JSON.
- TikTok posts use official embeds; availability and playback remain controlled by TikTok. The UI shows an honest poster fallback and never claims a video plays when the embed is unavailable.
- The QR code encodes **only** the permanent profile URL — never contact details.
- Phone and WhatsApp values are omitted unless explicitly published; the “Request contact details” path is used instead.
- Images are supplied by the profile owner and are not licensed for reuse outside this project.

## Documentation

- [Product & architecture](docs/PRODUCT-ARCHITECTURE.md)
- [Profile management](docs/PROFILE-MANAGEMENT.md)
- [Design system](docs/DESIGN-SYSTEM.md)
- [Deployment & operations](docs/DEPLOYMENT.md)

## Maintenance scripts

```bash
node scripts/prepare-media.mjs     # rebuild optimized images + photo library
node scripts/process-brand.mjs     # rebuild logo, icon and social assets
node scripts/generate-qr.mjs       # regenerate the homepage demo QR
node scripts/contact-sheets.mjs    # contact sheets used while curating photos
```

Regenerate the demo QR after changing the production domain; the encoded URL is baked into the PNG.
