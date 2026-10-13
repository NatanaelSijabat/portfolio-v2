# Repository Guidelines

## Project Structure & Module Organization

- `app/` — App Router routes. Case studies are explicit static routes at `app/projects/<slug>/page.tsx`, never dynamic `[slug]` segments.
- `components/` — shared React components; primitives live in `components/ui/`.
- `data/` — all copy as typed data (`site.ts`, `experience.ts`, `projects.ts`, `types.ts`). Nothing is fetched at runtime.
- `lib/` — small helpers such as `cn()`; `scripts/` — build and verification tooling; `public/` — generated `resume.pdf` and `og.png` only.

## Build, Test, and Development Commands

- `npm install` then `npm run dev` — install dependencies and serve on `localhost:3000`.
- `npm run dev:offline` — dev server for sandboxes that block child processes.
- `npm run build` / `npm start` — production build and serve.
- `npm run verify` — lint, typecheck, content, asset, and SSR render gates.
- `npm run resume` / `npm run og` — regenerate `public/resume.pdf` or `public/og.png` after content edits.

Set `NEXT_PUBLIC_SITE_URL` before deploying so metadata, sitemap, and robots point at the right host.

## Coding Style & Naming Conventions

- TypeScript is strict (`noUncheckedIndexedAccess`); 2-space indent, LF endings, double quotes, semicolons.
- Name component files in kebab-case and export PascalCase symbols: `components/site-header.tsx` → `SiteHeader`.
- Import via the `@/*` alias, external packages first, then a blank line, then internal imports.
- Style with Tailwind v4 utilities and merge classes with `cn()` from `lib/utils.ts`; theme tokens (`text-ink`, `bg-canvas`) live in `app/globals.css`.
- Run `npm run lint` (ESLint flat config) and `npm run typecheck` before committing.

## Testing Guidelines

There is no unit-test framework; integrity is enforced by scripts:

- `verify:content` — every case study has all ten sections, experience is reverse-chronological, links are `https` with `rel="noopener noreferrer"`, and placeholder copy or banned marketing language is rejected.
- `verify:assets` — parses real PDF xref offsets and text runs, and asserts `og.png` is 1200×630. Check a candidate with `node scripts/verify-assets.mjs path/to/candidate.pdf`.
- `verify:render` — boots an in-process server and asserts SSR output for every route.

To add a project: append to `data/projects.ts`, copy an existing page to `app/projects/<slug>/page.tsx`, then run `npm run verify`.

## Commit & Pull Request Guidelines

- Commits use one imperative, capitalized sentence with no conventional-commit prefix: `Add Natanael Sijabat fullstack engineering portfolio`.
- Husky runs `lint`, `typecheck`, `verify:content`, and `verify:assets` pre-commit, and full `npm run verify` pre-push; bypass with `HUSKY=0` or `--no-verify` only for a reason.
- Pull requests should state what changed, why, and which verification commands pass, with screenshots for UI changes.

## Content & Disclosure Rules

Client engagements are documented at capability level only — no source code, credentials, production data, or internal topology. Publish no metric, proficiency percentage, or claim that cannot be verified and disclosed.
