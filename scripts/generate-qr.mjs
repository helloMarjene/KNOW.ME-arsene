// Generates the demo QR used on the KNOW ME landing page.
import QRCode from "qrcode";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "qr");

await mkdir(OUT, { recursive: true });
await QRCode.toFile(path.join(OUT, "arsene-demo.png"), "https://www.marjenesoftwaredev.com/arsene", {
  errorCorrectionLevel: "H",
  margin: 4,
  width: 1024,
  color: { dark: "#0b1026ff", light: "#ffffffff" },
});
console.log("wrote public/qr/arsene-demo.png");
