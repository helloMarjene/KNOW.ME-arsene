"use client";

import { useEffect, useState } from "react";
import { CakeSlice } from "lucide-react";

function nextBirthday(birthday: string) {
  const [month, day] = birthday.split("-").map(Number);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let next = new Date(now.getFullYear(), month - 1, day);
  if (next.getTime() < today.getTime()) {
    next = new Date(now.getFullYear() + 1, month - 1, day);
  }
  const diff = Math.max(0, next.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

export function BirthdayCountdown({ birthday }: { birthday: string }) {
  const [countdown, setCountdown] = useState<ReturnType<typeof nextBirthday> | null>(null);

  useEffect(() => {
    const update = () => setCountdown(nextBirthday(birthday));
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, [birthday]);

  return (
    <div className="glass-soft inline-flex items-center gap-3 rounded-2xl px-4 py-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-pink/10 text-brand-pink">
        <CakeSlice size={16} aria-hidden />
      </span>
      <div>
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">
          Next birthday
        </p>
        <p className="mt-0.5 text-[0.82rem] font-semibold text-ink" aria-live="polite">
          {countdown
            ? `${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`
            : "Counting the days…"}
        </p>
      </div>
    </div>
  );
}
