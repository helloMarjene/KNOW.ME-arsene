import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The demo profile is localhost-only; hosted builds land its URL on the homepage showcase.
  async redirects() {
    return process.env.VERCEL
      ? [{ source: "/arsene", destination: "/#profiles", permanent: false }]
      : [];
  },
  outputFileTracingIncludes: {
    "/*": ["./src/data/profiles/**/*.json"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
