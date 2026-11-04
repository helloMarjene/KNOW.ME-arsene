"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PhotoAsset } from "@/lib/types";

const emptySubscribe = () => () => {};

export function Lightbox({
  open,
  photos,
  startIndex,
  title,
  onClose,
}: {
  open: boolean;
  photos: PhotoAsset[];
  startIndex: number;
  title: string;
  onClose: () => void;
}) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const reduceMotion = useReducedMotion();
  const [viewer, setViewer] = useState({ open, startIndex, index: startIndex });

  if (open && (!viewer.open || viewer.startIndex !== startIndex)) {
    setViewer({ open, startIndex, index: startIndex });
  } else if (!open && viewer.open) {
    setViewer({ open, startIndex, index: viewer.index });
  }

  const index = viewer.index;

  const next = useCallback(
    () =>
      setViewer((current) => ({
        ...current,
        index: (current.index + 1) % photos.length,
      })),
    [photos.length],
  );
  const previous = useCallback(
    () =>
      setViewer((current) => ({
        ...current,
        index: (current.index - 1 + photos.length) % photos.length,
      })),
    [photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, next, previous]);

  if (!mounted) return null;

  const photo = photos[index];

  return createPortal(
    <AnimatePresence>
      {open && photo && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photograph viewer`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] flex flex-col bg-[#05081a]/78 p-3 backdrop-blur-2xl sm:p-5"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-white backdrop-blur-xl sm:px-4">
            <div className="min-w-0 pl-2">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/55">
                {title}
              </p>
              <p className="mt-0.5 text-[0.75rem] font-semibold text-white/85">
                Photograph {index + 1} of {photos.length}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={previous}
                aria-label="Previous photograph"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <ChevronLeft size={19} aria-hidden />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next photograph"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <ChevronRight size={19} aria-hidden />
              </button>
              <span className="mx-1 h-6 w-px bg-white/15" aria-hidden />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close photograph viewer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X size={19} aria-hidden />
              </button>
            </div>
          </div>

          <div
            className="relative mx-auto mt-3 flex w-full max-w-7xl flex-1 items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-black/20"
            onClick={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={photo.src}
                initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={photo.src}
                  alt={`${title} — photograph ${index + 1}`}
                  fill
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={photo.blur}
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={previous}
              aria-label="Previous photograph"
              className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-xl transition-colors hover:bg-black/50 md:flex"
            >
              <ChevronLeft size={22} aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photograph"
              className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-xl transition-colors hover:bg-black/50 md:flex"
            >
              <ChevronRight size={22} aria-hidden />
            </button>
          </div>

          <p className="mx-auto mt-3 text-center text-[0.62rem] uppercase tracking-[0.18em] text-white/45">
            Use arrow keys to navigate · Esc to close
          </p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
