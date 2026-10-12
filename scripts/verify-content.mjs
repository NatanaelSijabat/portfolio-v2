/**
 * Content integrity checks.
 *
 * The portfolio must never publish an invented metric, a dead link, a placeholder,
 * or a case study with a missing section. These invariants are enforced in code so a
 * content edit cannot quietly break them.
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { experience } from "../data/experience.ts";
import { projects } from "../data/projects.ts";
import { certificates, education, principles, skillGroups, siteConfig } from "../data/site.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

const sectionKeys = [
  "overview",
  "problem",
  "role",
  "solution",
  "architecture",
  "challenges",
  "decisions",
  "outcome",
  "stack",
  "links",
];

check(projects.length >= 3, "expected at least three curated projects");

const slugs = new Set();
for (const project of projects) {
  check(!slugs.has(project.slug), `duplicate project slug: ${project.slug}`);
  slugs.add(project.slug);

  for (const key of sectionKeys) {
    const value = project.caseStudy[key];
    const missing =
      value === undefined ||
      value === null ||
      (Array.isArray(value) && value.length === 0 && key !== "links");
    check(!missing, `${project.slug}: case study section "${key}" is empty`);
  }

  check(project.caseStudy.solution.length >= 3, `${project.slug}: needs at least three solution points`);
  check(project.caseStudy.challenges.length >= 1, `${project.slug}: needs at least one challenge`);
  check(project.caseStudy.decisions.length >= 1, `${project.slug}: needs at least one decision`);
  check(project.caseStudy.outcome.length >= 1, `${project.slug}: needs at least one outcome`);
  check(project.caseStudy.disclosure.length > 40, `${project.slug}: disclosure note is too short`);
  check(project.stack.length > 0, `${project.slug}: technology stack is empty`);

  for (const layer of [
    project.caseStudy.architecture.client,
    project.caseStudy.architecture.service,
    project.caseStudy.architecture.data,
  ]) {
    check(layer.items.length > 0, `${project.slug}: architecture layer "${layer.label}" is empty`);
  }

  if (project.confidential) {
    check(
      project.caseStudy.links.length === 0,
      `${project.slug}: confidential work must not publish demo or repository links`,
    );
  }

  for (const link of project.caseStudy.links) {
    check(/^https:\/\//.test(link.href), `${project.slug}: link must use https (${link.href})`);
  }
}

for (const entry of experience) {
  check(entry.period.length > 0, `${entry.company}: missing period`);
  check(entry.bullets.length > 0, `${entry.company}: missing responsibility bullets`);
  check(entry.start.length > 0, `${entry.company}: missing sortable start date`);
  check(entry.stack.length > 0, `${entry.company}: missing stack`);
}

const starts = experience.map((entry) => entry.start);
const sortedDescending = [...starts].sort((a, b) => (a < b ? 1 : -1));
check(
  starts.every((value, index) => value === sortedDescending[index]),
  "experience must be listed in reverse chronological order",
);

check(education.length > 0, "education section is empty");
check(certificates.length > 0, "certificates section is empty");
check(principles.length >= 5, "expected at least five engineering principles");
check(skillGroups.length >= 4, "expected at least four skill groups");

if (siteConfig.email) {
  check(siteConfig.email.includes("@"), "siteConfig.email is not an email address");
}
if (siteConfig.linkedin) {
  check(/^https:\/\//.test(siteConfig.linkedin), "siteConfig.linkedin must use https");
}
check(/^https:\/\//.test(siteConfig.github), "siteConfig.github must use https");

// Source-level checks: no placeholders and no insecure external links.
const scannedFiles = [];

async function collect(directory) {
  const entries = await readdir(path.join(root, directory), { withFileTypes: true });
  for (const entry of entries) {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await collect(relative);
      continue;
    }
    if (/\.(tsx|ts)$/.test(entry.name)) scannedFiles.push(relative);
  }
}

await collect("app");
await collect("components");
await collect("data");

const bannedPhrases = [
  "lorem ipsum",
  "placeholder",
  "coming soon",
  "tbd",
  "world-class",
  "% proficiency",
  "proficiency:",
];

for (const file of scannedFiles) {
  const source = await readFile(path.join(root, file), "utf8");
  const lower = source.toLowerCase();

  for (const phrase of bannedPhrases) {
    check(!lower.includes(phrase), `${file}: contains banned phrase "${phrase}"`);
  }

  check(!/href="#"/.test(source), `${file}: contains a placeholder href="#" link`);
  check(!/TODO|FIXME/.test(source), `${file}: contains a TODO or FIXME marker`);

  const externalAnchors = source.match(/<a\b[^>]*target="_blank"[^>]*>/g) ?? [];
  for (const anchor of externalAnchors) {
    check(
      anchor.includes('rel="noopener noreferrer"'),
      `${file}: external link without rel="noopener noreferrer" (${anchor.slice(0, 60)}…)`,
    );
  }
}

if (failures.length > 0) {
  console.error(`content verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(
  `content verification passed — ${projects.length} projects, ${experience.length} engagements, ${scannedFiles.length} source files checked`,
);
