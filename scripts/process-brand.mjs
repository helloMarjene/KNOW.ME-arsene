// Converts the supplied JPEG logo into transparent brand assets.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SRC =
  "C:/Users/ADMIN/.qoder/tmp/C--Users-ADMIN-Documents-Qoder-2026-11-04-b1d5fb9e/images/b1d5fb9e-80c8-4318-87b8-9c2a7ad7180c/0a6908de-e976-4d69-8af5-16d445ac26f4.jpeg";
const OUT = path.join(ROOT, "public", "branding");

async function main() {
  await mkdir(OUT, { recursive: true });

  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const min = Math.min(r, g, b);

    // Recover alpha from a white background, then un-premultiply the colour.
    const alpha = Math.max(0, Math.min(1, (244 - min) / 48));
    if (alpha === 0) {
      out[i + 3] = 0;
      continue;
    }
    const a = alpha;
    out[i] = Math.max(0, Math.min(255, Math.round((r - 255 * (1 - a)) / a)));
    out[i + 1] = Math.max(0, Math.min(255, Math.round((g - 255 * (1 - a)) / a)));
    out[i + 2] = Math.max(0, Math.min(255, Math.round((b - 255 * (1 - a)) / a)));
    out[i + 3] = Math.round(a * 255);
  }

  const full = await sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 })
    .png()
    .toBuffer();

  await sharp(full).toFile(path.join(OUT, "know-me-logo.png"));
  const meta = await sharp(full).metadata();
  console.log("transparent logo:", meta.width, "x", meta.height);

  // Mark only: the wordmark occupies the bottom band of the supplied artwork.
  const markHeight = Math.round(meta.height * 0.795);
  const mark = await sharp(full)
    .extract({ left: 0, top: 0, width: meta.width, height: markHeight })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 })
    .png()
    .toBuffer();
  await sharp(mark).toFile(path.join(OUT, "know-me-mark.png"));
  const markMeta = await sharp(mark).metadata();
  console.log("mark:", markMeta.width, "x", markMeta.height);

  const wordmark = await sharp(full)
    .extract({
      left: 0,
      top: Math.round(meta.height * 0.78),
      width: meta.width,
      height: meta.height - Math.round(meta.height * 0.78),
    })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 })
    .png()
    .toBuffer();
  await sharp(wordmark).toFile(path.join(OUT, "know-me-wordmark.png"));
  const wordMeta = await sharp(wordmark).metadata();
  console.log("wordmark:", wordMeta.width, "x", wordMeta.height);

  // Favicons from the mark, on transparent background.
  const iconCanvas = sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  });
  const markResized = await sharp(mark)
    .resize({ width: 340, height: 340, fit: "inside" })
    .toBuffer();
  const markMeta2 = await sharp(markResized).metadata();
  await iconCanvas
    .composite([
      {
        input: markResized,
        left: Math.round((512 - (markMeta2.width ?? 340)) / 2),
        top: Math.round((512 - (markMeta2.height ?? 340)) / 2),
      },
    ])
    .png()
    .toFile(path.join(OUT, "icon-512.png"));
  await sharp(path.join(OUT, "icon-512.png"))
    .resize(180, 180)
    .png()
    .toFile(path.join(ROOT, "src", "app", "apple-icon.png"));
  await sharp(path.join(OUT, "icon-512.png"))
    .resize(64, 64)
    .png()
    .toFile(path.join(OUT, "favicon-64.png"));

  const palette = await sharp(SRC)
    .resize(200, 200)
    .stats()
    .then((s) => s.dominant);
  console.log("dominant colour:", palette);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
