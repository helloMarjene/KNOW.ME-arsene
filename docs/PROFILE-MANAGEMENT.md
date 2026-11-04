# Profile management

Profiles are managed centrally by the KNOW ME team. A profile is a single JSON file, a set of curated photo IDs, and optional links. Nothing in the UI lets a client edit a live profile; changes ship through this repository after review.

## Where content lives

| File | Purpose |
| --- | --- |
| `src/data/profiles/<slug>.json` | All profile content and contact policy |
| `src/data/photo-library.json` | Generated photo metadata keyed by photo ID |
| `public/images/arsene/` | Optimized images referenced by the library |
| `public/branding/` | Logo, avatar, social preview, app icons |
| `src/lib/profiles.ts` | Validation and defensive parsing |
| `src/lib/vcard.ts` | vCard generation |

Profile pages are statically generated. The loader memoizes profiles per process, so **restart `npm run dev` or rebuild after editing JSON**.

## Publishing a new profile

1. Add optimized images through `scripts/prepare-media.mjs`, or place files in `public/images/<slug>/` and add entries to `photo-library.json`.
2. Create `src/data/profiles/<slug>.json`.
3. Use a slug matching `^[a-z0-9]+(?:-[a-z0-9]+)*$`, and ensure `slug` matches the file name.
4. Set `"published": true`. Set it to `false` to remove the profile from routes, the sitemap and the build.
5. Add verified content only (see the rules below).
6. Restart the dev server, review in light/dark at 1440px and 390px, then run `npm run lint && npm run build`.

Unknown slugs and unpublished profiles return the custom 404 page; they are not included in `generateStaticParams()` or the sitemap.

## Schema reference

### Top level

```jsonc
{
  "slug": "arsene",
  "published": true,
  "identity": {},
  "contact": {},
  "socials": [],
  "story": {},
  "videos": {},
  "timeline": {},
  "services": {},
  "projects": {},
  "cta": {},
  "seo": {}
}
```

### `identity`

| Field | Notes |
| --- | --- |
| `fullName`, `firstName` | Required; `firstName` falls back to the first word of `fullName` |
| `title`, `company`, `location`, `tagline`, `summary` | Shown in the hero and share surfaces |
| `positioning` | String array of roles, rendered as chips |
| `intro` | String array; the first paragraph is used in the hero, the rest in “Ideas into working products” |
| `tools` | String array; recognised tools get official logos, others get generic icons |
| `avatar` | Public path, e.g. `/branding/arsene-avatar.jpg` |
| `coverPhotos` | Ordered photo IDs from the library; the first is the primary cover and the hero crossfades through the rest every 7 seconds |
| `coverAlt` | Description of the cover photograph |

### `contact`

```jsonc
{
  "email": "hello@marjenesoftwaredev.com",
  "phone": null,
  "whatsapp": null,
  "website": "https://www.marjenesoftwaredev.com"
}
```

Phone and WhatsApp are optional. Leave them `null` unless the owner has explicitly approved publication. When absent:

- The fixed dock’s WhatsApp action opens a pre-addressed email requesting the details.
- The vCard omits `TEL`.
- The Connect section says details are shared on request.

Never invent a number to “complete” the UI.

### `socials`

Only entries here are rendered. Supported `platform` values:

`email`, `website`, `whatsapp`, `instagram`, `facebook`, `tiktok`, `snapchat`, `x`, `linkedin`, `youtube`.

Each entry needs a valid `href` (`https:`, `http:`, `mailto:` or `tel:`). Invalid entries are dropped. Icons use official brand colors and the platform’s real mark.

```jsonc
{
  "platform": "tiktok",
  "label": "TikTok",
  "href": "https://www.tiktok.com/@handle",
  "handle": "@handle"
}
```

### `story`

```jsonc
{
  "eyebrow": "Visual biography",
  "title": "MY LIFE IN FRAMES",
  "headline": "A story told in light, colour and presence.",
  "description": "Short introduction shown once above the chapters.",
  "sections": [
    {
      "id": "portrait",
      "eyebrow": "01 — Portrait",
      "title": "MY STORY",
      "headline": "The person behind the work.",
      "description": "One or two sentences.",
      "accent": "blue",
      "photos": ["1", "3", "4"]
    }
  ]
}
```

- `id` must be a slug and unique within the page.
- `accent` is one of `blue`, `pink`, `indigo`, `rose`, `teal`.
- Photo IDs must exist in `photo-library.json`; unknown IDs are ignored.
- Sections with no valid photos are omitted, so chapters are genuinely optional.
- The current profile has five chapters (32 / 26 / 14 / 9 / 20 photographs).
- Each chapter moves independently, pauses when off-screen, resumes in view, and opens a lightbox on tap.

### `videos`

```jsonc
{
  "profileUrl": "https://www.tiktok.com/@handle",
  "note": "Honest description of embed behaviour.",
  "items": [
    {
      "id": "7688290313391066389",
      "kind": "photo",
      "label": "Post 01",
      "url": "https://vt.tiktok.com/…",
      "canonical": "https://www.tiktok.com/@handle/photo/7688290313391066389"
    }
  ]
}
```

- `id` must be numeric.
- `kind` is `video` or `photo`.
- The slug’s canonical URL is required; the short URL is used for the card’s outbound link.
- Playback support depends on TikTok and the visitor’s browser. Do not change copy to promise autoplay or playback that the platform may block.

### `timeline`

```jsonc
{
  "birthday": null,
  "note": "Only confirmed milestones appear here.",
  "entries": [
    {
      "period": "Now",
      "title": "Founder & Software Developer",
      "description": "Confirmed current work.",
      "icon": "briefcase"
    }
  ]
}
```

- `period` accepts qualitative labels (`Now`, `Ongoing`, `Always`, `Next`). Do not invent years.
- `icon` is `briefcase`, `layers`, `brain` or `compass`.
- `birthday` accepts `MM-DD` only when explicitly approved. Leave `null` to hide the countdown; never derive it from an unverified source.

### `services` and `projects`

`services.items` uses the icons `globe`, `smartphone`, `monitor`, `braces`, `layout`, `pen`, `sparkles`. Seven services are currently published.

`projects.items` must use one of three statuses:

- `Active company` — operating company with a public site.
- `In development` — announced internally, release not confirmed.
- `Exploration` — early concept.

`href` is `null` unless a real public URL exists. The UI labels unusable links as “Details on request”.

### `cta` and `seo`

- `cta.href` must be a working URL; it powers “Work With M.A.R.J.E.N.E” and the header CTA.
- `seo.title`, `seo.description` and `seo.ogImage` drive metadata and social cards.

## Photo library

`photo-library.json` is generated, not hand-authored:

```jsonc
{
  "107": {
    "src": "/images/arsene/arsene-107.jpg",
    "width": 1200,
    "height": 1600,
    "alt": "Arsene Kahunga",
    "blur": "data:image/webp;base64,…"
  }
}
```

Use descriptive alt text for any photograph featured prominently; collage images use a generated chapter-and-index alt. Never reference a file that is not in the library.

## Publication checklist

- [ ] Slug, name, role, company and location verified.
- [ ] Email verified; phone/WhatsApp intentionally absent or approved.
- [ ] Every social link opens the owner’s real account.
- [ ] All project statuses and links are accurate; no “live” claims for unreleased work.
- [ ] Timeline uses qualitative periods; no invented dates or birthday.
- [ ] Cover photo and chapter photos approved; alt text appropriate.
- [ ] TikTok posts load or fall back gracefully; copy makes no unsupported playback claim.
- [ ] Light and dark checked at 1440px and 390px; no horizontal overflow.
- [ ] vCard download opens correctly and contains only approved fields.
- [ ] QR download encodes only the profile URL.
- [ ] `npm run lint` and `npm run build` pass.

## Removing a profile

Set `"published": false` and rebuild. The page, vCard route and sitemap entry disappear. Keep the JSON if the content may return later; delete it only after owner approval.
