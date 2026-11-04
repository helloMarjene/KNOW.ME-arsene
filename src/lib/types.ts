export type SocialPlatform =
  | "email"
  | "website"
  | "whatsapp"
  | "instagram"
  | "facebook"
  | "tiktok"
  | "snapchat"
  | "x"
  | "linkedin"
  | "youtube";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
  handle?: string;
}

export interface ContactDetails {
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  website: string | null;
}

export type Accent = "blue" | "pink" | "indigo" | "rose" | "teal";

export interface StorySection {
  id: string;
  eyebrow: string;
  title: string;
  headline: string;
  description: string;
  accent: Accent;
  photos: string[];
}

export type TikTokKind = "video" | "photo";

export interface TikTokItem {
  id: string;
  kind: TikTokKind;
  label: string;
  url: string;
  canonical: string;
}

export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
  icon: "briefcase" | "layers" | "brain" | "compass";
}

export interface Timeline {
  birthday: string | null;
  note: string;
  entries: TimelineEntry[];
}

export interface Service {
  title: string;
  description: string;
  icon:
    | "globe"
    | "smartphone"
    | "monitor"
    | "braces"
    | "layout"
    | "pen"
    | "sparkles";
}

export type ProjectStatus =
  | "Active company"
  | "In development"
  | "Exploration";

export interface Project {
  name: string;
  description: string;
  status: ProjectStatus;
  href: string | null;
}

export interface ProfileIdentity {
  fullName: string;
  firstName: string;
  title: string;
  positioning: string[];
  location: string;
  company: string;
  tagline: string;
  summary: string;
  intro: string[];
  tools: string[];
  avatar: string;
  coverPhotos: string[];
  coverAlt: string;
}

export interface ProfileCta {
  heading: string;
  body: string;
  buttonLabel: string;
  href: string;
}

export interface ProfileSeo {
  title: string;
  description: string;
  ogImage: string;
}

export interface Profile {
  slug: string;
  published: boolean;
  identity: ProfileIdentity;
  contact: ContactDetails;
  socials: SocialLink[];
  story: {
    eyebrow: string;
    title: string;
    headline: string;
    description: string;
    sections: StorySection[];
  };
  videos: {
    profileUrl: string | null;
    note: string;
    items: TikTokItem[];
  };
  timeline: Timeline;
  services: {
    eyebrow: string;
    title: string;
    items: Service[];
  };
  projects: {
    eyebrow: string;
    title: string;
    note: string;
    items: Project[];
  };
  cta: ProfileCta;
  seo: ProfileSeo;
}

export interface PhotoAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
  blur: string;
}

export type PhotoLibrary = Record<string, PhotoAsset>;
