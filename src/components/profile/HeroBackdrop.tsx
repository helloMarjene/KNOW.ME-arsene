"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { PhotoAsset } from "@/lib/types";

const ROTATE_MS = 7000;

export function HeroBackdrop({ photos }: { photos: PhotoAsset[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % photos.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [photos.length]);

  return (
    <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden bg-ink">
      {photos.map((photo, index) => (
        <div
          key={photo.src}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-out motion-reduce:transition-none ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={photo.src}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={photo.blur}
            className="object-cover object-[50%_22%]"
          />
        </div>
      ))}
    </div>
  );
}
