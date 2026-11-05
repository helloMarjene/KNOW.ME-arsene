import type { MetadataRoute } from "next";
import { getProfileSlugs } from "@/lib/profiles";
import { PROFILES_PUBLIC, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...(PROFILES_PUBLIC
      ? getProfileSlugs().map((slug) => ({
          url: `${SITE.url}/${slug}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.9,
        }))
      : []),
  ];
}
