# Natanael Sijabat — Portfolio

Personal portfolio and engineering case-study site for Natanael Sijabat, Fullstack Engineer.
Built with Next.js (App Router), TypeScript, and Tailwind CSS v4. Every content route is
statically prerendered; there is no database, CMS, or authentication layer.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Set the canonical site URL before deploying so metadata, `sitemap.xml`, and `robots.txt`
point at the right host:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

It defaults to `http://localhost:3000` when unset, and the value is normalized (trailing
slashes are stripped).

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Standard Next.js dev server. |
| `npm run build` / `npm start` | Production build and server. |
| `npm run prepare` | Configures the husky git hooks (also runs automatically on `npm install`). |
| `npm run typecheck` | `tsc --noEmit` across the project. |
| `npm run lint` | ESLint with `next/core-web-vitals` + `next/typescript`. |
| `npm run verify:content` | Content integrity rules (see below). |
| `npm run verify:assets` | Binary asset integrity: PDF structure, xref offsets, text runs, PNG dimensions. |
| `npm run verify:render` | Boots a server and asserts real SSR output for every route. |
| `npm run verify` | Lint + typecheck + content + assets + render. |
| `npm run resume` | Regenerates `public/resume.pdf` from the typed content model. |
| `npm run og` | Regenerates `public/og.png` from an authored SVG. |

## Content model

All copy lives in `data/` as typed data. Nothing is fetched at runtime.

- `data/site.ts` — identity, contact channels, navigation, approach, principles, skills,
  education, certificates. Nullable contact channels are omitted from the UI when unset,
  so the site never renders a dead link or an unverified claim.
- `data/experience.ts` — reverse-chronological engagements.
- `data/projects.ts` — curated case studies with the ten documented sections.

To add an email address, LinkedIn profile, or other contact channel, set the value in
`data/site.ts`. The header, hero, contact section, and footer pick it up automatically.

## Case-study routes

Case studies are explicit static routes under `app/projects/<slug>/page.tsx` rather than a
`[slug]` segment. Each route is three lines: it resolves its own metadata and renders the
shared `CaseStudyView`. This keeps every page prerendered with no runtime lookup and no
dynamic-segment machinery.

To add a project:

1. Append an entry to `data/projects.ts`.
2. Add `app/projects/<slug>/page.tsx` using an existing file as the template.
3. Run `npm run verify`.

## Content integrity rules

`npm run verify:content` enforces, among other things:

- every case study has all ten sections, non-empty;
- confidential engagements publish no demo or repository links;
- external links use `https` and carry `rel="noopener noreferrer"`;
- no `href="#"`, `TODO`/`FIXME`, or placeholder copy;
- experience is listed in reverse chronological order;
- banned marketing language (for example "world-class", proficiency percentages) is rejected.

`npm run verify:assets` reads the real bytes of the generated files, because both are
produced by scripts in this repository rather than by a library:

- `public/resume.pdf` is written directly as PDF 1.4, so its cross-reference table stores
  absolute byte offsets. The verifier walks the xref table and asserts that every offset
  lands on the matching object header, and that every text run fits inside the page's text
  frame.
- It also asserts the resume contains the expected roles and dates, and that it does
  **not** contain the phone number, date of birth, or recruitment logo from the original CV.
- `public/og.png` must be a real 1200×630 PNG.

Pass a path to check a candidate file before replacing the published one:

```bash
node scripts/verify-assets.mjs path/to/candidate.pdf
```

## Binary assets and line endings

`.gitattributes` marks generated binaries as `binary` and normalises text to LF. This is not
cosmetic: with `core.autocrlf=true`, git would otherwise treat the ASCII-bodied resume PDF
as text, convert LF to CRLF on checkout, shift every offset in its cross-reference table,
and leave a file that no reader can open. `git ls-files --eol public/resume.pdf` should
report `attr/-text`.

## Git hooks

Runs on [husky](https://github.com/typicode/husky) 9. `npm install` triggers
`npm run prepare`, which sets `core.hooksPath` to `.husky/_` and generates the hook shims
there. Run `npm run prepare` once manually if you cloned the repo and already had
`node_modules` before the hooks existed.

| Hook | Runs |
| --- | --- |
| `.husky/pre-commit` | `lint`, `typecheck`, `verify:content`, `verify:assets` — fast gates for broken code, content-rule violations, and corrupted generated assets. |
| `.husky/pre-push` | `npm run verify` — the same gates plus the SSR render pass over every route. |

The hooks are intentionally layered: the render pass boots a local server, so it belongs on
push rather than on every commit.

Bypass an individual commit or push when you have a reason to:

```bash
HUSKY=0 git commit -m "wip"     # disables husky for this command
git commit --no-verify -m "wip" # standard git escape hatch
```

husky exits cleanly when git is unavailable or when `HUSKY=0` is set, so it cannot break a
production install (for example a Vercel build that runs `npm install`).

## Committing to the record

This site describes real work. Client engagements are documented at capability level only:
no source code, credentials, production data, internal service topology, or vendor
configuration. No performance, revenue, or adoption metric appears anywhere on the site
unless it can be verified and disclosed.

## Deployment

Configured for Vercel (`next.config.ts` sets security headers; there is no adapter to
install). Set `NEXT_PUBLIC_SITE_URL` in the project's environment variables, then deploy.

Because every content route is static, the site also works on any Node host that can run
`next start`, or behind Nginx with a certificate, if you prefer a VPS.

## Note on restricted build environments

Some sandboxes block Node from spawning child processes and block outbound network access.
In that situation `next build`, `next dev`, and `next/font/google` cannot run, which is an
environment limitation rather than a project defect. Two escape hatches are provided for
exactly that case:

- `npm run dev:offline` starts Next's server inside a single process (no workers, no fork).
- `npm run verify:render` uses the same in-process server to assert real SSR output.

The site deliberately does not use `next/font/google`; it sets type with a system font
stack, so builds never depend on network access for typography.
