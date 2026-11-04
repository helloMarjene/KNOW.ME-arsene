// Builds labelled contact sheets so the photo library can be catalogued.
import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const SRC =
  "C:/Users/ADMIN/Desktop/ARSENE-NOVEMBER/M.A.R.J.E.N.E WORKSHOP/arsene images";
const OUT = path.join(process.cwd(), ".tmp", "contact");
const CELL = 280;
const COLS = 5;
const ROWS = 5;
const PER_SHEET = COLS * ROWS;

const natural = (a, b) => {
  const na = Number(a.match(/\((\d+)\)/)?.[1] ?? 0);
  const nb = Number(b.match(/\((\d+)\)/)?.[1] ?? 0);
  return na - nb;
};

function escapeXml(value) {
  return value.replace(/[<>&"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const files = (await readdir(SRC))
    .filter((f) => /\.jpe?g$/i.test(f))
    .sort(natural);

  for (let sheet = 0; sheet < Math.ceil(files.length / PER_SHEET); sheet += 1) {
    const slice = files.slice(sheet * PER_SHEET, (sheet + 1) * PER_SHEET);
    const composites = [];
    for (let i = 0; i < slice.length; i += 1) {
      const file = slice[i];
      const num = file.match(/\((\d+)\)/)?.[1] ?? file;
      const x = (i % COLS) * CELL;
      const y = Math.floor(i / COLS) * CELL;
      const thumb = await sharp(path.join(SRC, file))
        .rotate()
        .resize(CELL - 8, CELL - 8, { fit: "cover" })
        .jpeg({ quality: 78 })
        .toBuffer();
      composites.push({ input: thumb, left: x + 4, top: y + 4 });
      const label = Buffer.from(
        `<svg width="${CELL}" height="26" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="rgba(0,0,0,0.62)"/>
          <text x="7" y="18" font-family="Arial" font-size="15" fill="#fff">${escapeXml(num)}</text>
        </svg>`,
      );
      composites.push({ input: label, left: x, top: y + CELL - 30 });
    }
    await sharp({
      create: {
        width: COLS * CELL,
        height: ROWS * CELL,
        channels: 3,
        background: { r: 245, g: 245, b: 245 },
      },
    })
      .composite(composites)
      .jpeg({ quality: 82 })
      .toFile(path.join(OUT, `sheet-${sheet + 1}.jpg`));
    console.log(`sheet-${sheet + 1}: ${slice[0]} .. ${slice[slice.length - 1]}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
