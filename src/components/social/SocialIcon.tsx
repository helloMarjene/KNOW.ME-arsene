import {
  siFacebook,
  siInstagram,
  siSnapchat,
  siTiktok,
  siWhatsapp,
  siX,
  siYoutube,
} from "simple-icons";
import { Globe, Mail } from "lucide-react";
import type { SocialPlatform } from "@/lib/types";

const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

interface BrandIcon {
  path: string;
  title: string;
  hex: string;
}

const BRAND_ICONS: Partial<Record<SocialPlatform, BrandIcon>> = {
  tiktok: siTiktok,
  instagram: siInstagram,
  facebook: siFacebook,
  snapchat: siSnapchat,
  x: siX,
  youtube: siYoutube,
  whatsapp: siWhatsapp,
  linkedin: { path: LINKEDIN_PATH, title: "LinkedIn", hex: "#0A66C2" },
};

export function SocialIcon({
  platform,
  size = 20,
  className = "",
  colored = false,
}: {
  platform: SocialPlatform;
  size?: number;
  className?: string;
  colored?: boolean;
}) {
  if (platform === "email") {
    return (
      <Mail
        size={size}
        strokeWidth={1.9}
        className={className}
        style={colored ? { color: "#f30e78" } : undefined}
        aria-hidden
      />
    );
  }
  if (platform === "website") {
    return (
      <Globe
        size={size}
        strokeWidth={1.9}
        className={className}
        style={colored ? { color: "#1b31e0" } : undefined}
        aria-hidden
      />
    );
  }

  const icon = BRAND_ICONS[platform];
  if (!icon) {
    return <Globe size={size} strokeWidth={1.9} className={className} aria-hidden />;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={colored ? { color: icon.hex } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <path fill="currentColor" d={icon.path} />
    </svg>
  );
}
