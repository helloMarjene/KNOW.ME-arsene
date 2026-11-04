"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    root.style.colorScheme = next;

    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((meta) =>
        meta.setAttribute("content", next === "dark" ? "#070a18" : "#f6f5fa"),
      );
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/55 text-ink shadow-sm backdrop-blur-xl transition-colors hover:bg-white/85 hover:text-brand-blue ${className}`}
    >
      <Sun size={17} aria-hidden className="theme-sun" />
      <Moon size={17} aria-hidden className="theme-moon" />
    </button>
  );
}
