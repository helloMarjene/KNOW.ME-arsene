import { Brain, Cpu, Layers, Lightbulb, MonitorSmartphone, Plug } from "lucide-react";
import {
  siC,
  siCplusplus,
  siDart,
  siFlutter,
  siJavascript,
  siLaravel,
  siNextdotjs,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siSqlite,
  siTypescript,
} from "simple-icons";

interface BrandMark {
  path: string;
  hex: string;
}

const BRANDS: Record<string, BrandMark> = {
  "C++": siCplusplus,
  C: siC,
  Dart: siDart,
  Flutter: siFlutter,
  PHP: siPhp,
  Laravel: siLaravel,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  React: siReact,
  "Next.js": siNextdotjs,
  Python: siPython,
  PostgreSQL: siPostgresql,
  SQLite: siSqlite,
};

const GENERIC: Record<string, { Icon: typeof Layers; color: string }> = {
  "Software Architecture": { Icon: Layers, color: "#1b31e0" },
  "API Development": { Icon: Plug, color: "#f30e78" },
  "Application Development": { Icon: MonitorSmartphone, color: "#1b31e0" },
  "Artificial Intelligence": { Icon: Brain, color: "#f30e78" },
  "Embedded Systems": { Icon: Cpu, color: "#0f766e" },
  "Technology Innovation": { Icon: Lightbulb, color: "#c0266a" },
};

export function ToolBadge({ tool }: { tool: string }) {
  const brand = BRANDS[tool];
  const generic = GENERIC[tool];

  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-white/75 bg-white/50 py-1.5 pl-1.5 pr-3 text-[0.7rem] font-semibold text-ink-soft backdrop-blur-md transition-colors hover:border-brand-blue/30 hover:bg-white/80 hover:text-brand-blue">
      <span className="theme-light-tile inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
        {brand ? (
          <svg
            viewBox="0 0 24 24"
            width={13}
            height={13}
            style={{ color: brand.hex }}
            aria-hidden="true"
            focusable="false"
          >
            <path fill="currentColor" d={brand.path} />
          </svg>
        ) : generic ? (
          <generic.Icon size={13} style={{ color: generic.color }} aria-hidden />
        ) : (
          <Lightbulb size={13} style={{ color: "#1b31e0" }} aria-hidden />
        )}
      </span>
      {tool}
    </li>
  );
}
