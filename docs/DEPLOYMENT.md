# Deployment & operations

## Requirements

- Node.js 20.9+ (Node 24 is used in development)
- A host that supports Next.js server rendering and image optimization (Vercel is the reference target)
- The production origin, for canonical URLs and QR generation

## Canonical origin

The public origin is `https://knowme-arsene.vercel.app`, defined as `SITE.url` in `src/lib/site.ts`. It drives canonical links, Open Graph and Twitter URLs, sitemap and robots entries, and the profile QR. If the production domain changes, update that value and rebuild.

## Profile visibility

Profiles are available on localhost only. Vercel builds receive `VERCEL=1`, so no profile routes are generated, the sitemap omits profile URLs, and `/api/vcard/[slug]` returns 404. `/arsene` redirects to `/#profiles` on the hosted site. Locally the full profile is generated and served. To reproduce the hosted behavior locally, build and start with `VERCEL=1`.

## Build & run

```bash
npm ci
npm run lint
npm run build
npm run start     # serves the production build on :3000
```

The build statically generates the homepage and every published profile. `src/data/profiles/**/*.json` is traced into the serverless bundle by `next.config.ts`, so JSON remains available where the vCard route and profile pages read it.

## Vercel

1. Import the repository; the framework is detected as Next.js.
2. Deploy. No database, storage bucket or cron job is required.
3. Keep `knowme-arsene.vercel.app` as the production domain, or update `SITE.url` in `src/lib/site.ts` if a different domain is attached, then redeploy.
4. Regenerate the homepage demo QR if the domain changed:

   ```bash
   node scripts/generate-qr.mjs
   ```

   Commit `public/qr/arsene-demo.png` and redeploy.

The QR shown and downloaded on a profile page is generated per request in the browser from the profile URL, so it always reflects the current origin without extra assets.

## Caching

- Pages: statically generated; a content change requires a rebuild/redeploy.
- `/api/vcard/[slug]`: `Cache-Control: public, max-age=3600, s-maxage=86400`.
- `/images/*`, `/branding/*`, `/qr/*`: immutable static assets served by Next/Vercel.
- If a profile is edited, redeploy before sharing a changed vCard so downloads are fresh.

## TikTok embeds

The video section uses TikTok’s official embed (`https://www.tiktok.com/embed/v2/<id>`). Consequences:

- Playback, autoplay, cookies and regional availability are controlled by TikTok, not this app.
- Some browsers, extensions, corporate networks or headless environments block third-party frames; the card then shows a poster, a play affordance and an “Open TikTok” link.
- Do not change copy to promise playback. The current note states that TikTok controls playback and that embeds leave the stage when out of view.
- No TikTok API keys or tokens are required.

## Privacy

- No analytics, pixel or tracking script is shipped.
- The QR encodes only the permanent profile URL, never email, phone or WhatsApp.
- vCards include only fields published in the profile JSON. `TEL` is omitted unless `contact.phone` is set.
- Contact actions fall back to email when phone/WhatsApp are intentionally withheld.

## Post-deploy verification

- [ ] `/` returns 200; `/arsene` redirects to `/#profiles`; an unknown slug returns 404.
- [ ] `/api/vcard/arsene` returns 404 on the hosted site.
- [ ] `/sitemap.xml` lists only the homepage and uses `https://knowme-arsene.vercel.app`.
- [ ] Canonical, Open Graph and Twitter tags reference the production URL and OG image.
- [ ] `/api/vcard/arsene` downloads a `.vcf` locally, with no unapproved phone number.
- [ ] QR PNG/SVG downloads scan and open the permanent profile URL.
- [ ] TikTok cards either play via the official embed or show the fallback without console errors.
- [ ] Light and dark themes at 390px and 1440px: no horizontal scroll, fixed contact dock visible and above the safe area.
- [ ] Story chapters crossfade, pause off-screen, resume in view, and open the lightbox on tap.
- [ ] Lighthouse: no layout shift from the hero image; images lazy-load below the fold.

## Updating content

Edit the profile JSON, photo library or assets, then redeploy. Restart the local dev server after JSON edits because profiles are memoized per process. See [Profile management](PROFILE-MANAGEMENT.md) before publishing.

## Rollback

Because there is no database, rolling back is a redeploy of the previous commit. Static assets and the QR are versioned with the code; the permanent profile URL is unaffected as long as the domain and slug stay the same.
