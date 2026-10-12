/**
 * Binary asset integrity checks.
 *
 * `public/resume.pdf` is written by our own generator, so its cross-reference table stores
 * absolute byte offsets. Any line-ending conversion anywhere in the chain corrupts it into
 * "Couldn't read xref table", which is invisible until someone opens the file. This script
 * validates the real bytes: structure, xref offsets, every text run inside the page frame,
 * required content, and forbidden content.
 *
 * Pass a PDF path as the first argument to verify a candidate file (for example one that
 * has been through a copy or round-trip) before it replaces the published resume.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { experience } from "../data/experience.ts";
import { siteConfig } from "../data/site.ts";
import { textWidth } from "./pdf-metrics.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

// ----------------------------------------------------------------- resume PDF
const resumeFile = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(root, "public", "resume.pdf");
const resumeBytes = await readFile(resumeFile);
const pdf = resumeBytes.toString("latin1");

check(pdf.startsWith("%PDF-1.4"), "resume.pdf: missing PDF header");
check(pdf.trimEnd().endsWith("%%EOF"), "resume.pdf: missing EOF marker");

const startxrefIndex = pdf.lastIndexOf("startxref");
check(startxrefIndex !== -1, "resume.pdf: missing startxref");

const xrefOffset = Number.parseInt(pdf.slice(startxrefIndex + "startxref".length).trim(), 10);
check(Number.isFinite(xrefOffset), "resume.pdf: startxref is not a number");
check(
  pdf.slice(xrefOffset, xrefOffset + 4) === "xref",
  "resume.pdf: startxref does not point at the xref table (byte offsets are wrong — " +
    "the file was almost certainly line-ending converted)",
);

const xrefBlock = pdf.slice(xrefOffset);
const headerMatch = xrefBlock.match(/^xref\s+0 (\d+)\s/);
check(Boolean(headerMatch), "resume.pdf: unreadable xref table header");

if (headerMatch) {
  const objectCount = Number.parseInt(headerMatch[1], 10);
  const entries = xrefBlock
    .slice(headerMatch[0].length)
    .split("\n")
    .filter((line) => /^\d{10} \d{5} [nf]/.test(line));

  check(
    entries.length === objectCount,
    `resume.pdf: xref lists ${entries.length} entries for ${objectCount} objects`,
  );

  for (let objectNumber = 1; objectNumber < objectCount; objectNumber += 1) {
    const entry = entries[objectNumber];
    if (!entry) continue;
    const offset = Number.parseInt(entry.slice(0, 10), 10);
    const expected = `${objectNumber} 0 obj`;
    check(
      pdf.slice(offset, offset + expected.length) === expected,
      `resume.pdf: xref offset for object ${objectNumber} does not point at its object header`,
    );
  }
}

// Every text run must sit inside the page text frame.
const PAGE_WIDTH = 595.28;
const MARGIN = 54;
const textRuns = [];

for (const block of pdf.split(" ET")) {
  const match = block.match(
    /\/F(\d) ([\d.]+) Tf(?: ([\d.]+) Tc)? 1 0 0 1 ([\d.]+) ([\d.]+) Tm \(([\s\S]*)\) Tj$/,
  );
  if (!match) continue;
  textRuns.push({
    bold: match[1] === "2",
    size: Number.parseFloat(match[2]),
    tracking: match[3] ? Number.parseFloat(match[3]) : 0,
    x: Number.parseFloat(match[4]),
    text: match[6].replace(/\\([\\()])/g, "$1"),
  });
}

check(textRuns.length > 100, `resume.pdf: expected many text runs, found ${textRuns.length}`);

for (const run of textRuns) {
  const width = textWidth(run.text, run.size, run.bold) + run.tracking * run.text.length;
  if (run.x + width > PAGE_WIDTH - MARGIN + 0.75) {
    failures.push(
      `resume.pdf: line overflows the text frame at ${(run.x + width).toFixed(1)}pt: "${run.text.slice(0, 60)}"`,
    );
  }
}

const resumeText = textRuns.map((run) => run.text).join("\n");

/** The generator folds typographic characters down to ASCII, so expectations match that. */
function normalizeForPdf(text) {
  return text.replace(/[\u2013\u2014\u00b7]/g, "-");
}

const requiredPhrases = [
  siteConfig.name,
  siteConfig.title,
  "github.com/NatanaelSijabat",
  ...experience.map((entry) => entry.company),
  ...experience.map((entry) => entry.period),
];

for (const phrase of requiredPhrases) {
  check(
    resumeText.includes(normalizeForPdf(phrase)),
    `resume.pdf: missing required content "${phrase}"`,
  );
}

// The source CV carried a phone number, a date of birth, and a recruitment logo. None of
// that may appear here.
const forbiddenPhrases = ["Entrust", "1997", "+62", "6280", "DOB", "January"];

for (const phrase of forbiddenPhrases) {
  check(
    !resumeText.includes(phrase),
    `resume.pdf: contains content that must not be published ("${phrase}")`,
  );
}

// --------------------------------------------------------------------- og.png
const ogBytes = await readFile(path.join(root, "public", "og.png"));
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
check(ogBytes.subarray(0, 8).equals(PNG_SIGNATURE), "og.png: not a valid PNG file");
check(ogBytes.subarray(12, 16).toString("ascii") === "IHDR", "og.png: missing IHDR chunk");
check(ogBytes.readUInt32BE(16) === 1200, `og.png: expected width 1200, found ${ogBytes.readUInt32BE(16)}`);
check(ogBytes.readUInt32BE(20) === 630, `og.png: expected height 630, found ${ogBytes.readUInt32BE(20)}`);

// ------------------------------------------------------------------- icon.svg
const iconSvg = await readFile(path.join(root, "app", "icon.svg"), "utf8");
check(iconSvg.includes("<svg"), "app/icon.svg: missing <svg> root element");
check(iconSvg.trimEnd().endsWith("</svg>"), "app/icon.svg: unclosed <svg> element");

if (failures.length > 0) {
  console.error(`asset verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(
  `asset verification passed — resume.pdf ${(resumeBytes.length / 1024).toFixed(1)} kB across ${
    textRuns.length
  } text runs, og.png 1200x630`,
);
