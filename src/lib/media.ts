import type { PhotoAsset, PhotoLibrary } from "./types";
import library from "@/data/photo-library.json";

const photos = library as PhotoLibrary;

export function getPhoto(id: string): PhotoAsset | null {
  return photos[id] ?? null;
}

export function photoIds(): string[] {
  return Object.keys(photos);
}
