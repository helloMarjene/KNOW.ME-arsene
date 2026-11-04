# Design system

KNOW ME looks like a premium editorial product: oversized display type, an italic serif counterpoint, deep blue and hot pink accents, and glass surfaces floating over soft light. Everything is mobile-first and works in both themes.

## Tokens

Defined once in `src/app/globals.css` under `@theme` so Tailwind utilities resolve to CSS variables. Dark mode overrides the same variables on `html[data-theme="dark"]`.

| Token | Light | Dark |
| --- | --- | --- |
| `--color-ink` | `#0b1026` | `#f1f4ff` |
| `--color-ink-soft` | `#3a4060` | `#c4cbe4` |
| `--color-ink-muted` | `#666c88` | `#939bb9` |
| `--color-brand-blue` | `#0a1cb4` | `#7f90ff` |
| `--color-brand-pink` | `#f30e78` | `#ff6fae` |
| `--color-pearl` (page) | `#f6f5fa` | `#070a18` |
| `--color-paper` | `#fdfcfa` | `#0b0f22` |
| `--glass-border` | `rgba(255,255,255,0.72)` | `rgba(255,255,255,0.1)` |
| `--veil` (photo fade) | `#f6f5fa` | `#070a18` |

Radius scale: chips/buttons are fully rounded; glass panels use `16–34px`; images use `14–16px`.

## Typography

Loaded with `next/font/google` and exposed as variables:

- **Sora** (`--font-display`, `.display`) — headlines, project names, stat values. Tight tracking (`-0.045em`), line-height `0.94`.
- **Manrope** (`--font-sans`) — body, UI, labels. Optical sizing features enabled.
- **Instrument Serif Italic** (`--font-editorial`, `.editorial`) — highlighted words, pull quotes, taglines.

`.eyebrow` is 11px, 600 weight, `0.26em` tracking, uppercase. Headlines use `clamp()` so they scale from 390px to 1440px without breakpoint jumps.

## Glass surfaces

| Class | Use |
| --- | --- |
| `.glass` | Primary floating panels: identity card, QR panel, connect card |
| `.glass-soft` | Lighter supporting chips and panels |
| `.glass-dark` | Cards over dark photography/video |
| `.glass-hover` | Lift-on-hover behavior for interactive glass |
| `.btn-primary` | Blue → violet → pink gradient CTA |
| `.btn-glass` | Secondary glass CTA |
| `.chip` | Small status/metadata pills |

Glass is always a legibility device, not decoration: keep strong content contrast on top, avoid stacking more than two glass layers, and never place body text on raw photography.

`.theme-light-tile` forces a white tile behind official brand marks. Brand colors must keep their true hues in both themes; do not tint logos with the theme accent.

## Photography rules

Photographs are the emotional center of a profile and are treated as **frameless**:

- No card, border, shadow or surrounding panel.
- `rounded-[14–16px]` image corners with `overflow-hidden`.
- `.photo-veil` adds a white/dark gradient at the bottom and a soft top sheen so images dissolve into the page.
- On desktop, chapters use an asymmetric absolute collage (6 frames) with slight rotation; mobile uses a 2-column grid with one tall frame.
- Each chapter’s frames crossfade independently, pause off-screen, resume in view, and open a lightbox on tap.
- No “Pause”, “Play” or “View all” controls in the collage; tapping a photograph is the interaction.

The hero also uses the supplied cover photographs full-bleed behind a `.hero-scrim` (vertical + horizontal gradients) so the portraits stay visible while type remains readable in both themes. When `coverPhotos` has more than one entry, the backdrop crossfades every 7 seconds with a 2s opacity transition; reduced motion keeps the first photograph static.

## Motion

- **Reveal** (`src/components/ui/Reveal.tsx`): `opacity 0→1`, `y 30→0`, `blur 10px→0`, 0.9s `cubic-bezier(0.16,1,0.3,1)`, triggered once at 8% viewport offset.
- **Collage**: 1.15s crossfades with `scale 1.06→1`; reduced motion disables rotation/scale and shortens transitions.
- **Ambient**: `km-float` (9s), `km-drift` (26s), `km-pulse` (3.4s) for decorative orbs and cards.
- **Marquee**: CSS translate loop, pauses on hover and when explicitly paused; becomes a scrollable row under reduced motion.
- All motion respects `prefers-reduced-motion` at both the CSS and Framer Motion level.

## Theme

- `data-theme` is set on `<html>` before paint by a small inline script; no flash of wrong theme.
- The page always opens dark for new visitors, independent of `prefers-color-scheme`. A chosen theme persists in `localStorage["know-me-theme"]`.
- `ThemeToggle` is a sun/moon button in the header (desktop and mobile menu). Icons are shown/hidden in CSS to avoid hydration mismatches.
- `theme-color` meta values update when the theme changes.
- Broad dark remaps exist for legacy `bg-white/*`, `border-white/*`, `bg-ink/*` and `border-ink/*` utilities, so components designed in light mode still invert safely.

## Layout & responsive behavior

- `.section-shell` caps content at `82rem` with `padding-inline: clamp(1.15rem, 4vw, 1.5rem)`.
- Document and body use `overflow-x: clip`; measured page width equals the viewport at 1440px and 390px.
- Mobile-first breakpoints: base → `sm` 640 → `md` 768 → `lg` 1024.
- The fixed `ContactDock` sits above `env(safe-area-inset-bottom)` and is followed by a spacer so footer content is never permanently hidden.
- Lightbox is full-screen, focus-managed, and closes on Escape/backdrop.

## Iconography

- UI icons: Lucide React, 1.6–2px strokes, sized 11–16px in context.
- Tech tools: official `simple-icons` marks on white tiles, with a generic Lucide fallback for non-brand concepts (architecture, API, AI, embedded systems).
- Social: official brand marks and hex colors (TikTok, website globe, email, share, QR); LinkedIn uses the official path and `#0A66C2`.
- Never substitute a generic glyph for a recognisable brand when an official mark exists.

## Writing style

- Confident, plain, specific. No hype and no fake proof.
- Statuses are explicit: “In development”, “Exploration”, “Details on request”.
- Never promise TikTok playback, phone numbers, project launches or social accounts that are not confirmed.
- Use sentence case for body copy, uppercase display for section titles and eyebrows.
