import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/branding/Logo";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <main id="main" className="section-shell flex min-h-dvh flex-col justify-center py-16">
      <div className="glass mx-auto w-full max-w-2xl rounded-[32px] p-8 text-center sm:p-12">
        <div className="flex justify-center">
          <Logo />
        </div>
        <p className="mt-8 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-brand-pink">
          404 · Profile not found
        </p>
        <h1 className="display mt-3 text-[clamp(2.4rem,6vw,4rem)] text-ink">
          This story isn&rsquo;t here.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[0.9rem] leading-relaxed text-ink-soft">
          The profile may have moved, or the link may be incomplete. Return to KNOW ME to see how a
          digital identity should feel.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          <Link href="/" className="btn btn-primary">
            <ArrowLeft size={15} aria-hidden />
            Back to KNOW ME
          </Link>
          <a
            href={SITE.company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-glass"
          >
            M.A.R.J.E.N.E
            <ArrowUpRight size={14} aria-hidden />
          </a>
        </div>
      </div>
    </main>
  );
}
