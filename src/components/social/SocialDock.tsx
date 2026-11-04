"use client";

import { useState } from "react";
import { Check, Link2, QrCode, Share2 } from "lucide-react";
import type { SocialLink } from "@/lib/types";
import { SocialIcon } from "./SocialIcon";

async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = value;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

const iconButton =
  "group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/55 text-ink-soft shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_24px_-18px_rgba(9,14,55,0.5)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/85 hover:text-brand-blue focus-visible:text-brand-blue";

export function SocialDock({
  socials,
  url,
  name,
}: {
  socials: SocialLink[];
  url: string;
  name: string;
}) {
  const [shared, setShared] = useState(false);

  const onShare = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: `${name} on KNOW ME`,
          text: `Discover ${name} on KNOW ME.`,
          url,
        });
        return;
      } catch {
        /* dismissed — fall through to copy */
      }
    }
    const ok = await copyText(url);
    if (ok) {
      setShared(true);
      window.setTimeout(() => setShared(false), 2200);
    }
  };

  return (
    <div
      className="glass inline-flex flex-wrap items-center gap-2 rounded-full p-2"
      aria-label="Profile connections"
    >
      {socials.map((social) => (
        <a
          key={`${social.platform}-${social.href}`}
          href={social.href}
          aria-label={social.label}
          title={`${social.label}${social.handle ? ` · ${social.handle}` : ""}`}
          {...(social.href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className={iconButton}
        >
          <span className="theme-light-tile inline-flex h-8 w-8 items-center justify-center rounded-full">
            <SocialIcon platform={social.platform} size={16} colored />
          </span>
        </a>
      ))}

      <span className="mx-0.5 h-6 w-px bg-ink/10" aria-hidden="true" />

      <button type="button" onClick={onShare} className={iconButton} aria-label="Share profile">
        {shared ? <Check size={18} aria-hidden /> : <Share2 size={17} aria-hidden />}
        <span className="sr-only" aria-live="polite">
          {shared ? "Link copied" : ""}
        </span>
      </button>

      <a href="#share" className={iconButton} aria-label="Profile QR code" title="Profile QR code">
        <QrCode size={18} aria-hidden />
      </a>
    </div>
  );
}

export function ConnectGrid({
  socials,
  url,
  name,
}: {
  socials: SocialLink[];
  url: string;
  name: string;
}) {
  const [shared, setShared] = useState(false);

  const onShare = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: `${name} on KNOW ME`,
          text: `Discover ${name} on KNOW ME.`,
          url,
        });
        return;
      } catch {
        /* dismissed */
      }
    }
    const ok = await copyText(url);
    if (ok) {
      setShared(true);
      window.setTimeout(() => setShared(false), 2200);
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {socials.map((social) => (
        <a
          key={`${social.platform}-${social.href}`}
          href={social.href}
          {...(social.href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="glass glass-hover group flex items-center gap-4 rounded-2xl p-4"
        >
          <span className="theme-light-tile inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:ring-brand-blue/30">
            <SocialIcon platform={social.platform} size={19} colored />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-ink">{social.label}</span>
            <span className="mt-0.5 block truncate text-xs text-ink-muted">
              {social.handle ?? social.label}
            </span>
          </span>
          <Link2
            size={16}
            className="ml-auto shrink-0 text-ink-muted/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-brand-pink"
            aria-hidden
          />
        </a>
      ))}

      <button
        type="button"
        onClick={onShare}
        className="glass glass-hover group flex items-center gap-4 rounded-2xl p-4 text-left"
      >
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink/[0.045] text-ink-soft transition-colors duration-300 group-hover:bg-brand-pink group-hover:text-white">
          {shared ? <Check size={19} aria-hidden /> : <Share2 size={19} aria-hidden />}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-ink">
            {shared ? "Link copied" : "Share this profile"}
          </span>
          <span className="mt-0.5 block truncate text-xs text-ink-muted">
            {shared ? "Ready to paste anywhere" : "Send it to someone who should know you"}
          </span>
        </span>
        <span className="sr-only" aria-live="polite">
          {shared ? "Profile link copied to clipboard" : ""}
        </span>
      </button>

      <a href="#share" className="glass glass-hover group flex items-center gap-4 rounded-2xl p-4">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink/[0.045] text-ink-soft transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white">
          <QrCode size={19} aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-ink">QR code &amp; card</span>
          <span className="mt-0.5 block truncate text-xs text-ink-muted">
            Download it for print or share it digitally
          </span>
        </span>
      </a>
    </div>
  );
}
