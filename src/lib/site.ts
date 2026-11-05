export const SITE = {
  name: "KNOW ME",
  tagline: "Your Identity. Your Story. Your Connection.",
  promise: "Your entire identity. One digital experience.",
  url: "https://knowme-arsene.vercel.app",
  company: {
    name: "M.A.R.J.E.N.E Software Development",
    shortName: "M.A.R.J.E.N.E",
    tagline: "We build. You grow.",
    website: "https://www.marjenesoftwaredev.com",
    email: "hello@marjenesoftwaredev.com",
  },
  demoSlug: "arsene",
} as const;

export const PROFILES_PUBLIC = !process.env.VERCEL;

export function profileUrl(slug: string): string {
  return `${SITE.url}/${slug}`;
}
