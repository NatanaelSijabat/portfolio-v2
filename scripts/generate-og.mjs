/**
 * Renders the Open Graph card (1200x630) from an authored SVG, using the same paper and
 * serif language as the site itself.
 *
 * The text is measured and wrapped up front, and the rendered PNG is read back and
 * checked for actual ink: if the glyphs did not rasterise (no usable font on the host),
 * the script reports it instead of shipping a blank card.
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
const SERIF = "Georgia, 'Times New Roman', serif";
const MONO = "Consolas, 'Courier New', monospace";

const PAPER = "#F7F5EF";
const INK = "#191817";
const MUTED = "#585349";
const SUBTLE = "#6F6A5F";
const LINE = "#E3DED3";
const ACCENT = "#9C3A12";

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Greedy wrap on word boundaries; the card is wide, so a character budget is enough. */
function wrap(text, maxCharacters) {
  const lines = [];
  let current = "";

  for (const word of text.split(/\s+/)) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxCharacters && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

const headlineLines = wrap(siteConfig.headline, 46);

const columnRules = Array.from({ length: 12 }, (_, index) => {
  const x = 96 + index * 88;
  return `<line x1="${x}" y1="0" x2="${x}" y2="${HEIGHT}" stroke="${LINE}" stroke-width="1" />`;
});

const headline = headlineLines
  .map(
    (line, index) =>
      `<text x="96" y="${352 + index * 42}" font-size="31" fill="${MUTED}" font-family="${SERIF}">${escapeXml(line)}</text>`,
  )
  .join("\n    ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${PAPER}" />
  <g>${columnRules.join("")}</g>
  <rect x="0" y="0" width="8" height="${HEIGHT}" fill="${ACCENT}" />
  <g>
    <text x="96" y="150" font-size="19" letter-spacing="4" fill="${ACCENT}" font-family="${MONO}">${escapeXml(siteConfig.eyebrow)}</text>
    <text x="96" y="272" font-size="68" font-weight="700" fill="${INK}" font-family="${SERIF}">${escapeXml(siteConfig.name)}</text>
    ${headline}
    <line x1="96" y1="470" x2="1104" y2="470" stroke="${LINE}" stroke-width="1" />
    <text x="96" y="524" font-size="20" fill="${SUBTLE}" font-family="${MONO}">TypeScript - Next.js - Hono - Node.js - Prisma - Redis</text>
    <text x="96" y="562" font-size="20" fill="${SUBTLE}" font-family="${MONO}">${escapeXml(siteConfig.location)}</text>
  </g>
</svg>`;

const buffer = await sharp(Buffer.from(svg)).png().toBuffer();

// Verify the card actually contains rendered type: the name band must be dense with dark
// pixels. A blank or missing font layer would leave that band almost empty.
const { data, info } = await sharp(buffer).greyscale().raw().toBuffer({ resolveWithObject: true });

let inkPixels = 0;
for (let y = 215; y < 290; y += 1) {
  for (let x = 96; x < 1104; x += 1) {
    if (data[y * info.width + x] < 110) inkPixels += 1;
  }
}

if (inkPixels < 800) {
  console.error(
    `OG card text did not rasterise (${inkPixels} ink pixels in the name band). ` +
      "Leaving metadata image-free rather than shipping a blank card.",
  );
  process.exit(0);
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, buffer);

console.log(
  `OG card written to ${path.relative(root, outputPath)} (${(buffer.length / 1024).toFixed(1)} kB, ${inkPixels} ink pixels)`,
);
