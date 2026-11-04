// Optimises the supplied photographs into web assets and writes a photo library.
import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC =
  "C:/Users/ADMIN/Desktop/ARSENE-NOVEMBER/M.A.R.J.E.N.E WORKSHOP/arsene images";
const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "images", "arsene");
const CATALOG = path.join(ROOT, "src", "data", "photo-library.json");

const SECTIONS = {
  story: [
    1, 3, 4, 5, 6, 8, 9, 10, 11, 14, 16, 17, 19, 20, 23, 26, 46, 48, 49, 50, 52,
    53, 56, 76, 104, 109, 112, 118, 126, 127, 130, 135,
  ],
  style: [55, 57, 58, 59, 60, 61, 62, 65, 66, 67, 70, 72, 73, 74, 75, 79, 93, 94, 95, 97, 100, 111, 115, 117, 121, 122],
  presence: [28, 29, 33, 68, 69, 78, 83, 84, 85, 101, 102, 107, 108, 132],
  moments: [7, 38, 43, 44, 77, 106, 125, 133, 134],
  energy: [12, 13, 30, 31, 37, 39, 40, 41, 42, 47, 91, 99, 113, 114, 116, 119, 120, 123, 124, 131],
};

const COVER = 107;
const ids = [...new Set([COVER, ...Object.values(SECTIONS).flat()])].sort(
  (a, b) => a - b,
);

const fileFor = (id) => `arsene (${id}).jpeg`;
const publicSrc = (id) => `/images/arsene/arsene-${id}.jpg`;

async function blurDataUrl(buffer) {
  const tiny = await sharp(buffer)
    .resize(20, 20, { fit: "inside" })
    .webp({ quality: 45 })
    .toBuffer();
  return `data:image/webp;base64,${tiny.toString("base64")}`;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  await mkdir(path.dirname(CATALOG), { recursive: true });

  const library = {};

  for (const id of ids) {
    const input = await readFile(path.join(SRC, fileFor(id)));
    const pipeline = sharp(input).rotate().resize({
      width: 1600,
      height: 1600,
      fit: "inside",
      withoutEnlargement: true,
    });

    const { width, height } = await pipeline
      .clone()
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(path.join(OUT, `arsene-${id}.jpg`))
      .then((info) => info);

    library[id] = {
      src: publicSrc(id),
      width,
      height,
      alt: "Arsene Kahunga",
      blur: await blurDataUrl(input),
    };
  }

  await writeFile(CATALOG, JSON.stringify(library, null, 2));

  // Square avatar cropped around the upper-middle of the cover portrait.
  const cover = await readFile(path.join(SRC, fileFor(COVER)));
  const coverMeta = await sharp(cover).rotate().metadata();
  const side = Math.round(Math.min(coverMeta.width, coverMeta.height) * 0.78);
  await sharp(cover)
    .rotate()
    .extract({
      left: Math.round((coverMeta.width - side) / 2),
      top: Math.round((coverMeta.height - side) * 0.28),
      width: side,
      height: side,
    })
    .resize(720, 720, { fit: "cover" })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(ROOT, "public", "branding", "arsene-avatar.jpg"));

  // Social sharing image.
  const ogBase = await sharp(cover)
    .rotate()
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .modulate({ brightness: 0.72 })
    .toBuffer();
  const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#070b2a" stop-opacity="0.94"/>
        <stop offset="0.55" stop-color="#070b2a" stop-opacity="0.62"/>
        <stop offset="1" stop-color="#070b2a" stop-opacity="0.18"/>
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2a3dd4"/>
        <stop offset="1" stop-color="#f81b72"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#shade)"/>
    <rect x="72" y="80" width="64" height="4" rx="2" fill="url(#accent)"/>
    <text x="72" y="150" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="8" fill="#dfe4ff">KNOW ME</text>
    <text x="72" y="260" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="bold" fill="#ffffff">ARSENE</text>
    <text x="72" y="344" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="bold" fill="#ffffff">KAHUNGA</text>
    <text x="74" y="404" font-family="Arial, Helvetica, sans-serif" font-size="25" letter-spacing="3" fill="#f7a8c9">FOUNDER &amp; SOFTWARE DEVELOPER</text>
    <text x="74" y="508" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#c9d0ef">One person. One profile. One link. One QR code.</text>
    <text x="74" y="548" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#c9d0ef">M.A.R.J.E.N.E Software Development</text>
  </svg>`);
  await sharp(ogBase)
    .composite([{ input: overlay, left: 0, top: 0 }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(ROOT, "public", "branding", "og-arsene.jpg"));

  console.log(`optimised ${ids.length} photographs`);
  Object.entries(SECTIONS).forEach(([key, list]) =>
    console.log(`${key}: ${list.length} photographs`),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
