import Image from "next/image";
import Link from "next/link";

export function LogoMark({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/branding/know-me-mark.png"
      alt=""
      width={924}
      height={968}
      style={{ height: size, width: "auto" }}
      className={className}
      priority
    />
  );
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`display text-[1.02rem] font-semibold uppercase leading-none tracking-[0.16em] ${className}`}
    >
      Know{" "}<span className="text-brand-pink">Me</span>
    </span>
  );
}

export function Logo({
  href = "/",
  compact = false,
  className = "",
}: {
  href?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="KNOW ME — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <LogoMark
        size={compact ? 28 : 34}
        className="transition-transform duration-500 group-hover:-rotate-3"
      />
      <span className="flex flex-col leading-none">
        <LogoWordmark />
        {!compact && (
          <span className="mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.3em] text-ink-muted">
            A M.A.R.J.E.N.E product
          </span>
        )}
      </span>
    </Link>
  );
}

export function FullLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/branding/know-me-logo.png"
      alt="KNOW ME"
      width={924}
      height={1218}
      className={`h-auto w-auto ${className}`}
    />
  );
}
