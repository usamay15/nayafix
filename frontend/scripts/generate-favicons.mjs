/**
 * nayafix.me Favicon Generator (using sharp — already installed by Next.js)
 * Run: node scripts/generate-favicons.mjs
 * Generates PNG favicons from the SVG favicon
 */

import sharp from "sharp";
import { writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");
const SVG_PATH = join(PUBLIC_DIR, "favicon.svg");

const svgBuffer = readFileSync(SVG_PATH);

const sizes = [
  { size: 16,  name: "favicon-16x16.png" },
  { size: 32,  name: "favicon-32x32.png" },
  { size: 180, name: "apple-touch-icon.png" },
];

console.log("🎨 Generating nayafix.me PNG favicons...\n");

for (const { size, name } of sizes) {
  const outPath = join(PUBLIC_DIR, name);
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(outPath);
  console.log(`  ✓ ${name} (${size}x${size})`);
}

console.log("\n✅ All PNG favicons generated in /public/!");
