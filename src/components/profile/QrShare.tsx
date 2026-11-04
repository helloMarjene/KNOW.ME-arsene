"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import {
  Check,
  Copy,
  Download,
  Link2,
  ShieldCheck,
} from "lucide-react";
import type { Profile } from "@/lib/types";
import { profileUrl } from "@/lib/site";
import { LogoMark } from "@/components/branding/Logo";
import { Reveal } from "@/components/ui/Reveal";

const COLORS = { dark: "#0b1026", light: "#ffffff" } as const;

export function QrShare({ profile }: { profile: Profile }) {
  const url = profileUrl(profile.slug);
  const [preview, setPreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState<"png" | "svg" | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(url, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 1024,
      color: COLORS,
    })
      .then((dataUrl) => {
        if (!cancelled) setPreview(dataUrl);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const downloadPng = async () => {
    setBusy("png");
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        errorCorrectionLevel: "H",
        margin: 4,
        width: 2048,
        color: COLORS,
      });
      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = `know-me-${profile.slug}-qr.png`;
      anchor.click();
    } finally {
      setBusy(null);
    }
  };

  const downloadSvg = async () => {
    setBusy("svg");
    try {
      const svg = await QRCode.toString(url, {
        type: "svg",
        errorCorrectionLevel: "H",
        margin: 4,
        width: 1024,
        color: COLORS,
      });
      const anchor = document.createElement("a");
      anchor.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
      anchor.download = `know-me-${profile.slug}-qr.svg`;
      anchor.click();
    } finally {
      setBusy(null);
    }
  };

  return (
    <section id="share" className="relative py-16 sm:py-24">
      <div className="section-shell">
        <Reveal>
          <div className="glass grain relative overflow-hidden rounded-[32px] p-5 sm:rounded-[38px] sm:p-8 lg:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(10,28,180,0.13),transparent_70%)] blur-2xl"
            />

            <div className="relative grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
              <div className="mx-auto w-full max-w-[21rem]">
                <div className="glass-soft rounded-[28px] p-3.5">
                  <div className="relative overflow-hidden rounded-[20px] bg-white p-3 shadow-[inset_0_0_0_1px_rgba(11,16,38,0.06)]">
                    {preview ? (
                      <Image
                        src={preview}
                        alt={`QR code linking to ${profile.identity.fullName}'s KNOW ME profile`}
                        width={512}
                        height={512}
                        unoptimized
                        className="h-auto w-full rounded-lg"
                      />
                    ) : (
                      <div className="aspect-square w-full animate-pulse rounded-lg bg-ink/[0.045]" />
                    )}
                    {preview && (
                      <span className="absolute left-1/2 top-1/2 inline-flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-ink/5 bg-white p-1.5 shadow-md">
                        <LogoMark size={28} />
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3 px-1 pb-0.5 pt-3">
                    <div>
                      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                        Scan to discover
                      </p>
                      <p className="text-[0.78rem] font-semibold text-ink">
                        {profile.identity.fullName}
                      </p>
                    </div>
                    <span className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                      KNOW ME
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-center text-[0.58rem] uppercase tracking-[0.18em] text-ink-muted">
                  Preview · centre mark not included in downloads
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-gradient-to-r from-brand-blue to-brand-pink" />
                  <span className="eyebrow text-ink-muted">Share &amp; print</span>
                </div>
                <h2 className="display mt-4 text-[clamp(2rem,4.4vw,3.4rem)] uppercase text-ink">
                  One link.{" "}
                  <span className="editorial font-normal normal-case text-brand-blue">
                    every room
                  </span>
                  <span className="text-brand-pink">.</span>
                </h2>
                <p className="mt-4 max-w-xl text-[0.88rem] leading-relaxed text-ink-soft">
                  This QR code encodes the permanent profile link — never the contact details. Print
                  it on a card, place it on a desk or share it on screen. When the profile changes,
                  the QR stays the same.
                </p>

                <div className="mt-6 flex items-center gap-2 rounded-2xl border border-white/75 bg-white/55 p-2 backdrop-blur-xl">
                  <Link2 size={15} className="ml-2 shrink-0 text-ink-muted" aria-hidden />
                  <span className="min-w-0 flex-1 truncate text-[0.78rem] font-medium text-ink-soft">
                    {url.replace(/^https?:\/\//, "")}
                  </span>
                  <button
                    type="button"
                    onClick={copy}
                    className="btn btn-glass !min-h-9 shrink-0 !px-3 !text-[0.68rem]"
                  >
                    {copied ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
                    {copied ? "Copied" : "Copy link"}
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={downloadPng}
                    disabled={busy !== null}
                    className="btn btn-primary !min-h-11 !px-4 !text-[0.72rem] disabled:opacity-60"
                  >
                    <Download size={14} aria-hidden />
                    {busy === "png" ? "Preparing…" : "Download PNG"}
                  </button>
                  <button
                    type="button"
                    onClick={downloadSvg}
                    disabled={busy !== null}
                    className="btn btn-glass !min-h-11 !px-4 !text-[0.72rem] disabled:opacity-60"
                  >
                    <Download size={14} aria-hidden />
                    {busy === "svg" ? "Preparing…" : "Download SVG"}
                  </button>
                </div>

                {failed && (
                  <p className="mt-3 text-[0.72rem] text-brand-pink">
                    The QR preview could not be generated. Try refreshing the page.
                  </p>
                )}

                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {[
                    ["High-resolution", "2048px PNG or vector SVG"],
                    ["Print-ready", "Four-module quiet zone"],
                    ["Permanent", "Updates never require a reprint"],
                    ["Contact-safe", "Only the profile URL is encoded"],
                  ].map(([title, detail]) => (
                    <div
                      key={title}
                      className="flex items-start gap-2 rounded-2xl border border-white/70 bg-white/35 px-3 py-2.5 backdrop-blur-md"
                    >
                      <ShieldCheck size={13} className="mt-0.5 shrink-0 text-brand-blue" aria-hidden />
                      <div>
                        <p className="text-[0.72rem] font-semibold text-ink">{title}</p>
                        <p className="text-[0.66rem] leading-snug text-ink-muted">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
