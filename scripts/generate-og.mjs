/**
 * Renders the Open Graph card (1200x630) from an authored SVG.
 *
 * Text is measured and positioned up front, and the final PNG is validated by reading
 * the rendered pixels back: if the glyphs did not rasterise (no usable font on the
 * host), the script reports it instead of shipping a blank card.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { siteConfig } from "../data/site.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(root, "public", "og.png");

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch (error) {
  console.error(`sharp is unavailable, skipping OG image generation: ${error.message}`);
  process.exit(0);
}

const WIDTH = 1200;
const HEIGHT = 630;
const FONT = "Segoe UI, Inter, Helvetica Neue, Arial, sans-serif";
const MONO = "Consolas, SFMono-Regular, Menlo, monospace";

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const gridLines = Array.from({ length: 12 }, (_, index) => {
  const x = 96 + index * 88;
  return `<line x1="${x}" y1="0" x2="${x}" y2="${HEIGHT}" stroke="#1B1D22" stroke-width="1" />`;
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0C0D0F" />
  <g opacity="0.55">${gridLines.join("")}</g>
  <rect x="0" y="0" width="8" height="${HEIGHT}" fill="#FB923C" />
  <g font-family="${FONT}">
    <text x="96" y="150" font-size="19" letter-spacing="4" fill="#FB923C" font-family="${MONO}">FULLSTACK ENGINEER - SOFTWARE DEVELOPER</text>
    <text x="96" y="268" font-size="70" font-weight="700" fill="#ECEDEE">Natanael Sijabat</text>
    <text x="96" y="342" font-size="30" fill="#A2A8B0">Building reliable software, from interface</text>
    <text x="96" y="384" font-size="30" fill="#A2A8B0">to infrastructure.</text>
    <line x1="96" y1="464" x2="1104" y2="464" stroke="#23262B" stroke-width="1" />
    <text x="96" y="518" font-size="21" fill="#7C828A" font-family="${MONO}">TypeScript - Next.js - Hono - Node.js - Prisma - MongoDB - Redis</text>
    <text x="96" y="562" font-size="21" fill="#7C828A" font-family="${MONO}">${escapeXml(siteConfig.location)}</text>
  </g>
</svg>`;

const buffer = await sharp(Buffer.from(svg)).png().toBuffer();

// Verify the card actually contains rendered text: rows below the headline must
// include light pixels, which a blank text layer would not produce.
const { data, info } = await sharp(buffer)
  .greyscale()
  .raw()
  .toBuffer({ resolveWithObject: true });

let lightPixelsInHeadline = 0;
for (let y = 210; y < 290; y += 1) {
  for (let x = 96; x < 1100; x += 1) {
    if (data[y * info.width + x] > 140) lightPixelsInHeadline += 1;
  }
}

if (lightPixelsInHeadline < 500) {
  console.error(
    `OG card text did not rasterise (${lightPixelsInHeadline} bright pixels in the headline band). ` +
      "Leaving metadata image-free rather than shipping a blank card.",
  );
  process.exit(0);
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, buffer);

console.log(`OG card written to ${path.relative(root, outputPath)} (${(buffer.length / 1024).toFixed(1)} kB)`);
