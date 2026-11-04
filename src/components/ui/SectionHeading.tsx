import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={`flex flex-col gap-6 ${
        centered
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between"
      } ${className}`}
    >
      <div className={centered ? "max-w-3xl" : "max-w-3xl"}>
        {eyebrow && (
          <div
            className={`mb-4 flex items-center gap-3 ${centered ? "justify-center" : ""}`}
          >
            <span className="h-px w-8 bg-gradient-to-r from-brand-blue to-brand-pink" />
            <span className="eyebrow text-ink-muted">{eyebrow}</span>
          </div>
        )}
        <h2 className="display text-balance text-[clamp(2rem,4.6vw,3.9rem)] text-ink">
          {title}
        </h2>
        {description && (
          <p className="mt-5 max-w-2xl text-pretty text-[0.98rem] leading-relaxed text-ink-soft md:text-base">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
