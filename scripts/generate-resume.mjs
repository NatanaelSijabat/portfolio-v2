/**
 * Generates public/resume.pdf from the same typed content model the site renders.
 *
 * The original CV supplied for this project contained a phone number, a date of birth,
 * and a third-party recruitment logo. None of that belongs on a public portfolio, so the
 * published resume is regenerated from verified facts only, with no external tooling.
 *
 * The PDF is written directly (PDF 1.4, built-in Helvetica/Courier metrics) so the script
 * has no dependencies and works with no network access.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { experience } from "../data/experience.ts";
import { certificates, education, siteConfig, skillGroups } from "../data/site.ts";
import { textWidth } from "./pdf-metrics.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(root, "public", "resume.pdf");

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 54;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
/** Body copy is set to a shorter measure than the frame: easier to read, and it keeps
 * every line well inside the page so no viewer can clip a long run of text. */
const MEASURE = 430;

const INK = "0.09 0.09 0.1";
const MUTED = "0.36 0.38 0.4";
const SUBTLE = "0.48 0.5 0.52";
const ACCENT = "0.7 0.25 0.05";
const RULE = "0.86 0.85 0.83";

const CLEAN = new RegExp("[^\\x20-\\x7E]", "g");

function clean(text) {
  return String(text)
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u00b7/g, "-")
    .replace(/\u2026/g, "...")
    .replace(CLEAN, "")
    .trim();
}

function escapePdf(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapText(text, size, maxWidth, bold = false) {
  const words = clean(text).split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (textWidth(candidate, size, bold) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

const pages = [];
let ops = [];
let cursor = PAGE_HEIGHT - MARGIN;

function newPage() {
  pages.push(ops);
  ops = [];
  cursor = PAGE_HEIGHT - MARGIN;
}

function ensureSpace(height) {
  if (cursor - height < MARGIN) newPage();
}

function drawText(text, { x = MARGIN, size = 9.5, bold = false, color = INK, spacing } = {}) {
  const font = bold ? "F2" : "F1";
  const tracking = typeof spacing === "number" ? ` ${spacing} Tc` : "";
  const value = clean(text);
  const rendered =
    textWidth(value, size, bold) +
    (typeof spacing === "number" ? spacing * Math.max(value.length - 1, 0) : 0);

  if (x + rendered > PAGE_WIDTH - MARGIN + 0.75) {
    throw new Error(
      `resume line overflows the text frame (${(x + rendered).toFixed(1)}pt > ${(
        PAGE_WIDTH - MARGIN
      ).toFixed(1)}pt): "${value}"`,
    );
  }

  ops.push(
    `BT ${color} rg /${font} ${size} Tf${tracking} 1 0 0 1 ${x.toFixed(2)} ${cursor.toFixed(2)} Tm (${escapePdf(value)}) Tj ET`,
  );
}

function rule({ gap = 0 } = {}) {
  ops.push(
    `${RULE} RG 0.7 w ${MARGIN} ${(cursor - gap).toFixed(2)} m ${(PAGE_WIDTH - MARGIN).toFixed(2)} ${(cursor - gap).toFixed(2)} l S`,
  );
}

function paragraph(text, { size = 9.5, color = MUTED, indent = 0, bold = false, lineHeight = 13 } = {}) {
  const width = Math.min(MEASURE, CONTENT_WIDTH) - indent;
  for (const line of wrapText(text, size, width, bold)) {
    ensureSpace(lineHeight);
    drawText(line, { x: MARGIN + indent, size, color, bold });
    cursor -= lineHeight;
  }
}

function bullet(text, size = 9.5, lineHeight = 13) {
  const indent = 12;
  const lines = wrapText(text, size, Math.min(MEASURE, CONTENT_WIDTH) - indent, false);
  lines.forEach((line, index) => {
    ensureSpace(lineHeight);
    if (index === 0) {
      drawText("-", { x: MARGIN, size, color: ACCENT });
    }
    drawText(line, { x: MARGIN + indent, size, color: MUTED });
    cursor -= lineHeight;
  });
}

function sectionTitle(title) {
  ensureSpace(32);
  cursor -= 10;
  drawText(title.toUpperCase(), { size: 8, bold: true, color: SUBTLE, spacing: 1.1 });
  cursor -= 8;
  rule();
  cursor -= 12;
}

// ---------------------------------------------------------------- header
drawText(siteConfig.name, { size: 22, bold: true, color: INK });
cursor -= 20;
drawText(siteConfig.title, { size: 11, bold: false, color: ACCENT });
cursor -= 15;
drawText(`${siteConfig.location}  |  github.com/NatanaelSijabat`, {
  size: 8.8,
  color: SUBTLE,
});
cursor -= 12;
rule();
cursor -= 18;

// ----------------------------------------------------------------- profile
sectionTitle("Profile");
paragraph(
  "Fullstack engineer with professional software development experience since 2022 across frontend and fullstack roles. Builds business-oriented web applications, backend APIs, payment and delivery integrations, operational dashboards, and mobile-connected services. Works with React, Next.js, TypeScript, Node.js, Hono, NestJS, and relational and document databases.",
);
cursor -= 6;

// ------------------------------------------------------------------- skills
sectionTitle("Core Skills");
for (const group of skillGroups) {
  ensureSpace(26);
  drawText(`${group.title}:`, { size: 9.5, bold: true, color: INK });
  cursor -= 12.5;
  paragraph(group.items.join(", "), { size: 9.2, color: MUTED, lineHeight: 12.4 });
  cursor -= 4;
}
cursor -= 2;

// --------------------------------------------------------------- experience
sectionTitle("Professional Experience");
for (const entry of experience) {
  ensureSpace(56);
  drawText(`${entry.position} - ${entry.company}`, { size: 10.5, bold: true, color: INK });
  cursor -= 12.5;
  drawText(`${entry.period}  |  ${entry.engagement}  |  ${entry.context}`, {
    size: 8.6,
    color: SUBTLE,
  });
  cursor -= 12.5;
  for (const item of entry.bullets) bullet(item, 9.2, 11.9);
  cursor -= 5;
}

// ---------------------------------------------------------------- education
sectionTitle("Education");
for (const item of education) {
  ensureSpace(28);
  drawText(`${item.programme} - ${item.institution}`, { size: 10, bold: true, color: INK });
  cursor -= 13;
  drawText(item.period, { size: 8.6, color: SUBTLE });
  cursor -= 16;
}
cursor -= 2;

// ------------------------------------------------------------- certificates
sectionTitle("Certifications");
for (const item of certificates) {
  ensureSpace(30);
  drawText(item.name, { size: 9.6, bold: true, color: INK });
  cursor -= 13;
  paragraph(`${item.issuer} | ${item.role} | Awarded ${item.awarded} | ID ${item.reference}`, {
    size: 8.8,
    color: SUBTLE,
  });
  cursor -= 6;
}

pages.push(ops);

// ------------------------------------------------------------ pdf assembly
const pageCount = pages.length;
const firstPageObject = 3;
const fontObjects = [firstPageObject + pageCount * 2, firstPageObject + pageCount * 2 + 1];
const totalObjects = fontObjects[1];

const objectBodies = new Array(totalObjects + 1);
objectBodies[1] = "<< /Type /Catalog /Pages 2 0 R >>";

const kids = [];
for (let index = 0; index < pageCount; index += 1) {
  kids.push(`${firstPageObject + index * 2} 0 R`);
}
objectBodies[2] = `<< /Type /Pages /Kids [${kids.join(" ")}] /Count ${pageCount} >>`;

pages.forEach((pageOps, index) => {
  const pageObject = firstPageObject + index * 2;
  const contentObject = pageObject + 1;
  const stream = pageOps.join("\n");

  objectBodies[pageObject] =
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] ` +
    `/Resources << /Font << /F1 ${fontObjects[0]} 0 R /F2 ${fontObjects[1]} 0 R >> >> ` +
    `/Contents ${contentObject} 0 R >>`;

  objectBodies[contentObject] = `<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`;
});

objectBodies[fontObjects[0]] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
objectBodies[fontObjects[1]] =
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";

const chunks = [];
let byteOffset = 0;
const offsets = new Array(totalObjects + 1).fill(0);

function push(text) {
  const buffer = Buffer.from(text, "latin1");
  chunks.push(buffer);
  byteOffset += buffer.length;
}

push("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");

for (let objectNumber = 1; objectNumber <= totalObjects; objectNumber += 1) {
  offsets[objectNumber] = byteOffset;
  push(`${objectNumber} 0 obj\n${objectBodies[objectNumber]}\nendobj\n`);
}

const xrefOffset = byteOffset;
let xref = `xref\n0 ${totalObjects + 1}\n0000000000 65535 f \n`;
for (let objectNumber = 1; objectNumber <= totalObjects; objectNumber += 1) {
  xref += `${String(offsets[objectNumber]).padStart(10, "0")} 00000 n \n`;
}
push(xref);
push(`trailer\n<< /Size ${totalObjects + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, Buffer.concat(chunks));

console.log(
  `resume written to ${path.relative(root, outputPath)} — ${pageCount} page(s), ${(Buffer.concat(chunks).length / 1024).toFixed(1)} kB`,
);
