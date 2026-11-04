"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/branding/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { SITE } from "@/lib/site";

export interface HeaderLink {
  label: string;
  href: string;
}

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

function Cta({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={`btn btn-primary ${className}`}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
        <ArrowUpRight size={15} aria-hidden />
      </a>
    );
  }
  return (
    <Link href={href} className={`btn btn-primary ${className}`}>
      {label}
      <ArrowUpRight size={15} aria-hidden />
    </Link>
  );
}

export function SiteHeader({
  links,
  cta,
  label,
}: {
  links: HeaderLink[];
  cta: HeaderLink;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="section-shell !px-0">
          <div className="glass flex items-center justify-between gap-3 rounded-[22px] px-3 py-2.5 sm:px-4">
            <Logo className="min-w-0" />

            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              {links.map((link) =>
                isExternal(link.href) ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-full px-3.5 py-2 text-[0.8rem] font-semibold text-ink-soft transition-colors hover:bg-white/60 hover:text-ink"
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full px-3.5 py-2 text-[0.8rem] font-semibold text-ink-soft transition-colors hover:bg-white/60 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="flex items-center gap-2">
              {label && (
                <span className="hidden xl:inline-flex chip mr-1 !border-white/70 !bg-white/40 dark:!border-white/15 dark:!bg-white/10">
                  {label}
                </span>
              )}
              <ThemeToggle />
              <Cta
                href={cta.href}
                label={cta.label}
                className="hidden !min-h-10 !px-4 !text-xs sm:inline-flex"
              />
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/55 text-ink shadow-sm backdrop-blur-xl transition-colors hover:bg-white/85 lg:hidden"
              >
                <Menu size={18} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[70] flex flex-col bg-pearl/85 px-5 pb-8 pt-5 backdrop-blur-2xl lg:hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(10,28,180,0.16),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(243,14,120,0.14),transparent_55%)]"
            />
            <div className="flex items-center justify-between">
              <Logo />
              <div className="flex items-center gap-2">
                <ThemeToggle className="h-11 w-11" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  autoFocus
                  aria-label="Close menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/70 text-ink shadow-sm backdrop-blur-xl"
                >
                  <X size={19} aria-hidden />
                </button>
              </div>
            </div>

            <nav aria-label="Mobile" className="mt-14 flex flex-col">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index + 0.08, duration: 0.45 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline border-b border-ink/10 py-4"
                  >
                    <span className="display text-[1.9rem] text-ink">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto space-y-4 pt-10">
              <Cta href={cta.href} label={cta.label} className="w-full" />
              <p className="text-center text-[0.7rem] leading-relaxed text-ink-muted">
                {SITE.company.name}
                <br />
                {SITE.company.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
