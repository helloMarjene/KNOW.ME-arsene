import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { FullLogo, LogoMark } from "@/components/branding/Logo";
import { SITE } from "@/lib/site";

export interface FooterLink {
  label: string;
  href: string;
}

export function SiteFooter({
  links = [],
  profileName,
}: {
  links?: FooterLink[];
  profileName?: string;
}) {
  return (
    <footer className="section-shell pb-6 pt-16 sm:pt-24">
      <div className="glass grain relative overflow-hidden rounded-[28px] p-6 sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(243,14,120,0.18),transparent_70%)] blur-2xl"
        />
        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="flex items-start gap-4">
              <FullLogo className="h-16 sm:h-20" />
              <span className="mt-1 hidden h-16 w-px bg-ink/10 sm:block" />
              <p className="mt-1 hidden max-w-[15rem] text-[0.7rem] font-semibold uppercase leading-relaxed tracking-[0.18em] text-ink-muted sm:block">
                Your Identity.
                <br />
                Your Story.
                <br />
                Your Connection.
              </p>
            </div>
            <p className="mt-6 max-w-md text-[0.9rem] leading-relaxed text-ink-soft">
              {profileName
                ? `${profileName}'s profile is designed, published and maintained by the KNOW ME team.`
                : "KNOW ME is a centrally managed digital identity experience. We design, publish and maintain every profile."}
            </p>
            <p className="mt-4 text-[0.78rem] font-semibold text-ink">
              KNOW ME is a product of {SITE.company.name}.
            </p>
            <p className="text-[0.78rem] text-ink-muted">
              {SITE.company.tagline} · Kampala, Uganda
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-6">
            <div className="min-w-0">
              <p className="eyebrow text-ink-muted">
                {profileName ? "On this profile" : "Discover"}
              </p>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-[0.82rem] text-ink-soft transition-colors hover:text-brand-blue"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={12}
                          className="opacity-40 transition-opacity group-hover:opacity-100"
                          aria-hidden
                        />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[0.82rem] text-ink-soft transition-colors hover:text-brand-blue"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0">
              <p className="eyebrow text-ink-muted">Company</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={SITE.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-1 text-[0.82rem] text-ink-soft transition-colors hover:text-brand-blue"
                  >
                    <span className="break-all">marjenesoftwaredev.com</span>
                    <ArrowUpRight
                      size={12}
                      className="mt-0.5 shrink-0 opacity-40"
                      aria-hidden
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.company.email}`}
                    className="inline-flex items-start gap-1.5 text-[0.82rem] text-ink-soft transition-colors hover:text-brand-blue"
                  >
                    <Mail size={12} className="mt-0.5 shrink-0 opacity-60" aria-hidden />
                    <span className="break-all">{SITE.company.email}</span>
                  </a>
                </li>
                <li>
                  <Link
                    href="/#how"
                    className="text-[0.82rem] text-ink-soft transition-colors hover:text-brand-blue"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="text-[0.82rem] text-ink-soft transition-colors hover:text-brand-blue"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative mt-10 flex flex-col gap-3 border-t border-ink/10 pt-5 text-[0.7rem] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} M.A.R.J.E.N.E Software Development. All rights reserved.</p>
          <p className="inline-flex items-center gap-2">
            <LogoMark size={16} />
            Designed and built in Kampala, Uganda.
          </p>
        </div>
      </div>
    </footer>
  );
}
