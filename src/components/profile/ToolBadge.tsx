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
  const iconColor = brand ? brand.hex : generic?.color ?? "#1b31e0";

  return (
    <li
      className="theme-light-tile inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/75 bg-white/50 shadow-sm backdrop-blur-md transition-transform hover:-translate-y-1 hover:border-brand-blue/30 hover:bg-white/80 sm:h-16 sm:w-16"
      title={tool}
      aria-label={tool}
    >
      <span className="inline-flex h-11 w-11 items-center justify-center sm:h-12 sm:w-12">
        {brand ? (
          <svg
            viewBox="0 0 24 24"
            width={30}
            height={30}
            className="sm:h-[34px] sm:w-[34px]"
            style={{ color: iconColor }}
            aria-hidden="true"
            focusable="false"
          >
            <path fill="currentColor" d={brand.path} />
          </svg>
        ) : generic ? (
          <generic.Icon size={30} className="sm:h-[34px] sm:w-[34px]" style={{ color: iconColor }} aria-hidden />
        ) : (
          <Lightbulb size={30} className="sm:h-[34px] sm:w-[34px]" style={{ color: iconColor }} aria-hidden />
        )}
      </span>
    </li>
  );
}
