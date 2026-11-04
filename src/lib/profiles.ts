import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import type {
  Accent,
  PhotoLibrary,
  Profile,
  ProjectStatus,
  Service,
  SocialPlatform,
  StorySection,
  TikTokItem,
  TimelineEntry,
} from "./types";
import library from "@/data/photo-library.json";

const PROFILES_DIR = path.join(process.cwd(), "src", "data", "profiles");
const PHOTOS = library as PhotoLibrary;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const memo = new Map<string, Profile | null>();

const obj = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

const arr = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

const str = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value.trim() : fallback;

const strOrNull = (value: unknown): string | null => {
  const text = str(value);
  return text.length > 0 ? text : null;
};

const href = (value: unknown): string | null => {
  const text = str(value);
  if (!text) return null;
  try {
    const url = new URL(text);
    return ["https:", "http:", "mailto:", "tel:"].includes(url.protocol)
      ? text
      : null;
  } catch {
    return null;
  }
};

const isOneOf = <T extends string>(value: unknown, options: readonly T[]): value is T =>
  typeof value === "string" && options.includes(value as T);

const ACCENTS: readonly Accent[] = ["blue", "pink", "indigo", "rose", "teal"];
const PLATFORMS: readonly SocialPlatform[] = [
  "email",
  "website",
  "whatsapp",
  "instagram",
  "facebook",
  "tiktok",
  "snapchat",
  "x",
  "linkedin",
  "youtube",
];
const TIMELINE_ICONS = ["briefcase", "layers", "brain", "compass"] as const;
const SERVICE_ICONS = [
  "globe",
  "smartphone",
  "monitor",
  "braces",
  "layout",
  "pen",
  "sparkles",
] as const;
const PROJECT_STATUSES: readonly ProjectStatus[] = [
  "Active company",
  "In development",
  "Exploration",
];

function parseSections(value: unknown): StorySection[] {
  return arr(value).flatMap((entry) => {
    const item = obj(entry);
    const id = str(item.id);
    const photos = arr(item.photos)
      .map((photo) => str(photo))
      .filter((photo) => Boolean(PHOTOS[photo]));
    if (!SLUG_PATTERN.test(id) || photos.length === 0) return [];
    return [
      {
        id,
        eyebrow: str(item.eyebrow),
        title: str(item.title),
        headline: str(item.headline),
        description: str(item.description),
        accent: isOneOf(item.accent, ACCENTS) ? item.accent : "blue",
        photos,
      },
    ];
  });
}

function parseVideos(value: unknown): { note: string; profileUrl: string | null; items: TikTokItem[] } {
  const videos = obj(value);
  const items = arr(videos.items).flatMap((entry) => {
    const item = obj(entry);
    const id = str(item.id);
    const canonical = href(item.canonical);
    const shortUrl = href(item.url);
    if (!/^\d+$/.test(id) || !canonical || !shortUrl) return [];
    return [
      {
        id,
        kind: item.kind === "photo" ? ("photo" as const) : ("video" as const),
        label: str(item.label, `Post ${id.slice(-2)}`),
        url: shortUrl,
        canonical,
      },
    ];
  });
  return {
    note: str(videos.note),
    profileUrl: href(videos.profileUrl),
    items,
  };
}

function parseTimeline(value: unknown) {
  const timeline = obj(value);
  const birthday = str(timeline.birthday);
  const entries: TimelineEntry[] = arr(timeline.entries).flatMap((entry) => {
    const item = obj(entry);
    const title = str(item.title);
    if (!title) return [];
    const icon = isOneOf(item.icon, TIMELINE_ICONS) ? item.icon : "compass";
    return [
      {
        period: str(item.period),
        title,
        description: str(item.description),
        icon,
      },
    ];
  });
  return {
    birthday: /^\d{2}-\d{2}$/.test(birthday) ? birthday : null,
    note: str(timeline.note),
    entries,
  };
}

function parseServices(value: unknown): Service[] {
  return arr(value).flatMap((entry) => {
    const item = obj(entry);
    const title = str(item.title);
    if (!title) return [];
    return [
      {
        title,
        description: str(item.description),
        icon: isOneOf(item.icon, SERVICE_ICONS) ? item.icon : "sparkles",
      },
    ];
  });
}

function parseProfile(raw: unknown): Profile | null {
  const root = obj(raw);
  const identity = obj(root.identity);
  const fullName = str(identity.fullName);
  const firstName = str(identity.firstName) || fullName.split(" ")[0] || "Profile";
  if (!fullName) return null;

  const coverPhotos = [
    ...new Set(
      arr(identity.coverPhotos)
        .map((photo) => str(photo))
        .filter((photo) => Boolean(PHOTOS[photo])),
    ),
  ];
  const contact = obj(root.contact);
  const story = obj(root.story);
  const services = obj(root.services);
  const projects = obj(root.projects);
  const cta = obj(root.cta);
  const seo = obj(root.seo);
  const slug = str(root.slug);

  const socials = arr(root.socials).flatMap((entry) => {
    const item = obj(entry);
    const platform = item.platform;
    const link = href(item.href);
    if (!isOneOf(platform, PLATFORMS) || !link) return [];
    return [
      {
        platform,
        label: str(item.label, platform),
        href: link,
        ...(str(item.handle) ? { handle: str(item.handle) } : {}),
      },
    ];
  });

  return {
    slug,
    published: root.published !== false,
    identity: {
      fullName,
      firstName,
      title: str(identity.title),
      positioning: arr(identity.positioning).map((item) => str(item)).filter(Boolean),
      location: str(identity.location),
      company: str(identity.company),
      tagline: str(identity.tagline),
      summary: str(identity.summary),
      intro: arr(identity.intro).map((item) => str(item)).filter(Boolean),
      tools: arr(identity.tools).map((item) => str(item)).filter(Boolean),
      avatar: str(identity.avatar, "/branding/know-me-mark.png"),
      coverPhotos,
      coverAlt: str(identity.coverAlt, `Portrait of ${fullName}`),
    },
    contact: {
      email: strOrNull(contact.email),
      phone: strOrNull(contact.phone),
      whatsapp: strOrNull(contact.whatsapp),
      website: href(contact.website),
    },
    socials,
    story: {
      eyebrow: str(story.eyebrow),
      title: str(story.title),
      headline: str(story.headline),
      description: str(story.description),
      sections: parseSections(story.sections),
    },
    videos: parseVideos(root.videos),
    timeline: parseTimeline(root.timeline),
    services: {
      eyebrow: str(services.eyebrow),
      title: str(services.title),
      items: parseServices(services.items),
    },
    projects: {
      eyebrow: str(projects.eyebrow),
      title: str(projects.title),
      note: str(projects.note),
      items: arr(projects.items).flatMap((entry) => {
        const item = obj(entry);
        const name = str(item.name);
        if (!name) return [];
        return [
          {
            name,
            description: str(item.description),
            status: isOneOf(item.status, PROJECT_STATUSES)
              ? item.status
              : "In development",
            href: href(item.href),
          },
        ];
      }),
    },
    cta: {
      heading: str(cta.heading, "Have an idea? Let's build something meaningful."),
      body: str(cta.body),
      buttonLabel: str(cta.buttonLabel, "Get in touch"),
      href: href(cta.href) ?? "https://www.marjenesoftwaredev.com",
    },
    seo: {
      title: str(seo.title, `${fullName} | KNOW ME`),
      description: str(seo.description, identity.summary ? str(identity.summary) : `Discover ${fullName} on KNOW ME.`),
      ogImage: str(seo.ogImage, "/branding/og-arsene.jpg"),
    },
  };
}

export function getProfileSlugs(): string[] {
  try {
    return readdirSync(PROFILES_DIR)
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(/\.json$/, ""))
      .filter((slug) => SLUG_PATTERN.test(slug));
  } catch {
    return [];
  }
}

export function getProfile(slug: string): Profile | null {
  if (!SLUG_PATTERN.test(slug)) return null;
  if (memo.has(slug)) return memo.get(slug) ?? null;

  let profile: Profile | null = null;
  try {
    const file = readFileSync(path.join(PROFILES_DIR, `${slug}.json`), "utf8");
    const parsed = parseProfile(JSON.parse(file));
    if (parsed && parsed.slug === slug && parsed.published) {
      profile = parsed;
    } else if (parsed && parsed.slug !== slug) {
      console.warn(`[know-me] profile "${slug}" declares a different slug`);
    }
  } catch (error) {
    console.warn(`[know-me] could not load profile "${slug}"`, error);
  }

  memo.set(slug, profile);
  return profile;
}

export function getPublishedProfiles(): Profile[] {
  return getProfileSlugs()
    .map((slug) => getProfile(slug))
    .filter((profile): profile is Profile => profile !== null);
}
