/**
 * Renders every route through a real Next.js server and asserts the HTML a crawler or
 * visitor would receive: status codes, headings, metadata, navigation, and content.
 *
 * Usage: node scripts/verify-render.mjs [port]
 */
import { projects } from "../data/projects.ts";
import { experience } from "../data/experience.ts";
import { siteConfig } from "../data/site.ts";

const port = Number.parseInt(process.argv[2] ?? "4321", 10);
const hostname = "127.0.0.1";
const baseUrl = `http://${hostname}:${port}`;

process.env.NODE_ENV = "development";
process.env.TURBOPACK = "1";
process.env.__NEXT_DEV_SERVER = "1";
process.env.NEXT_PRIVATE_WORKER = "1";

async function isServerRunning() {
  try {
    const response = await fetch(`${baseUrl}/`, { redirect: "manual" });
    return response.status < 500;
  } catch {
    return false;
  }
}

/**
 * Reuse an already-running dev server when one is present (the usual case while
 * developing); otherwise start Next in-process, since this sandbox blocks the worker
 * processes that `next dev` normally forks.
 */
let server;
const reusingExistingServer = await isServerRunning();

if (!reusingExistingServer) {
  const { startServer } = await import("next/dist/server/lib/start-server.js");
  server = await startServer({
    dir: process.cwd(),
    isDev: true,
    port,
    hostname,
    allowRetry: false,
  });
}

const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

async function fetchHtml(route) {
  const response = await fetch(`${baseUrl}${route}`, { redirect: "manual" });
  const html = await response.text();
  return { response, html };
}

const routes = [
  { route: "/", expectStatus: 200, markers: [siteConfig.headline, "Explore Projects", "View Resume"] },
  { route: "/projects", expectStatus: 200, markers: ["Projects and the decisions behind them."] },
  ...projects.map((project) => ({
    route: `/projects/${project.slug}`,
    expectStatus: 200,
    markers: [project.name, "Engineering decisions", project.caseStudy.disclosure.slice(0, 40)],
  })),
  { route: "/sitemap.xml", expectStatus: 200, markers: ["/projects/"] },
  { route: "/robots.txt", expectStatus: 200, markers: ["Sitemap:"] },
  { route: "/this-route-does-not-exist", expectStatus: 404, markers: ["does not exist"] },
];

for (const { route, expectStatus, markers } of routes) {
  let result;
  try {
    result = await fetchHtml(route);
  } catch (error) {
    failures.push(`${route}: request failed (${error.message})`);
    continue;
  }

  const { response, html } = result;
  check(
    response.status === expectStatus,
    `${route}: expected status ${expectStatus}, received ${response.status}`,
  );

  for (const marker of markers) {
    check(html.includes(marker), `${route}: missing expected content "${marker.slice(0, 48)}…"`);
  }

  if (expectStatus !== 200) continue;

  if (route !== "/robots.txt" && route !== "/sitemap.xml") {
    const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
    check(h1Count === 1, `${route}: expected exactly one <h1>, found ${h1Count}`);
    check(html.includes("<title>"), `${route}: missing <title>`);
    check(
      /<meta name="description" content="[^"]+"/.test(html),
      `${route}: missing meta description`,
    );
    check(/<link rel="canonical" href="[^"]+"/.test(html), `${route}: missing canonical link`);
    check(
      !html.includes('href="#"'),
      `${route}: contains a placeholder anchor`,
    );
  }
}

const home = await fetchHtml("/");
check(
  home.html.includes(`github.com/NatanaelSijabat`) || home.html.includes(siteConfig.github),
  "/: missing GitHub link",
);
check(
  !/href="#"/.test(home.html),
  "/: contains a placeholder anchor",
);
for (const entry of experience) {
  check(
    home.html.includes(entry.company),
    `/: missing experience entry for ${entry.company}`,
  );
}
check(
  home.html.includes('rel="noopener noreferrer"'),
  "/: external links are missing rel=noopener noreferrer",
);

// A case study page must expose all ten documented sections.
const sample = projects[0];
if (sample) {
  const caseStudy = await fetchHtml(`/projects/${sample.slug}`);
  for (const id of [
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
  ]) {
    check(caseStudy.html.includes(`id="${id}"`), `/projects/${sample.slug}: missing section #${id}`);
  }
}

if (server) await server.close?.();

if (failures.length > 0) {
  console.error(`render verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(
  `render verification passed — ${routes.length} routes rendered and checked${
    reusingExistingServer ? " (reused the dev server already listening)" : ""
  }`,
);
process.exit(0);
