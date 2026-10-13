import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { Section } from "@/components/section";
import { ButtonLink } from "@/components/ui/button";
import { TechList } from "@/components/ui/tech-list";
import { getProject, projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export const caseStudySections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "role", label: "My role" },
  { id: "solution", label: "Solution" },
  { id: "architecture", label: "Architecture" },
  { id: "challenges", label: "Technical challenges" },
  { id: "decisions", label: "Engineering decisions" },
  { id: "outcome", label: "Outcome" },
  { id: "stack", label: "Technology stack" },
  { id: "links", label: "Links" },
] as const;

/**
 * Case studies are emitted as explicit static routes rather than a `[slug]` segment so
 * every page is prerendered at build time with no runtime lookup.
 */
export function buildCaseStudyMetadata(slug: string): Metadata {
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found", robots: { index: false, follow: false } };
  }

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.name} — ${siteConfig.name}`,
      description: project.summary,
      url: `${siteConfig.url}/projects/${project.slug}`,
    },
  };
}

export function CaseStudyView({ slug }: { slug: string }) {
  const project = getProject(slug);

  if (!project) notFound();

  const { caseStudy } = project;
  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.summary,
    applicationCategory: project.category,
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: siteConfig.title,
      url: siteConfig.url,
    },
    keywords: project.stack.join(", "),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Section bordered={false} className="pb-10 pt-12 sm:pt-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          All projects
        </Link>

        <p className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-subtle">
          {project.category} · {project.year}
          {project.confidential ? " · sanitised client work" : ""}
        </p>

        <h1 className="mt-4 max-w-3xl text-[1.95rem] font-normal leading-[1.16] tracking-tight text-ink sm:text-[2.5rem] sm:leading-[1.12]">
          {project.name}
        </h1>
        <p className="mt-4 font-mono text-xs text-subtle">
          {project.organisation} · {project.period}
        </p>
        <p className="mt-6 max-w-3xl text-[1.0625rem] leading-8 text-ink">{project.summary}</p>
        <p className="mt-5 max-w-3xl text-[0.9375rem] leading-7 text-muted">
          <span className="label mr-2 text-accent">Interesting part</span>
          {project.highlight}
        </p>
      </Section>

      <div className="border-t border-line">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Case study sections" className="lg:sticky lg:top-24 lg:self-start">
            <p className="label text-subtle">Contents</p>
            <ul className="mt-5 space-y-1.5">
              {caseStudySections.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="flex gap-3 rounded py-1.5 text-sm text-muted transition-colors hover:text-accent"
                  >
                    <span className="font-mono text-[0.6875rem] text-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-14">
            <section id="overview">
              <h2 className="border-t border-line pt-4 text-[1.15rem] font-normal tracking-tight text-ink">
                <span className="mr-3 font-mono text-[0.6875rem] tabular-nums text-accent">01</span>
                Overview
              </h2>
              <p className="mt-4 text-base leading-8 text-muted">{caseStudy.overview}</p>
            </section>

            <section id="problem">
              <h2 className="border-t border-line pt-4 text-[1.15rem] font-normal tracking-tight text-ink">
                <span className="mr-3 font-mono text-[0.6875rem] tabular-nums text-accent">02</span>
                Problem
              </h2>
              <p className="mt-4 text-base leading-8 text-muted">{caseStudy.problem}</p>
            </section>

            <section id="role">
              <h2 className="border-t border-line pt-4 text-[1.15rem] font-normal tracking-tight text-ink">
                <span className="mr-3 font-mono text-[0.6875rem] tabular-nums text-accent">03</span>
                My role
              </h2>
              <p className="mt-4 text-base leading-8 text-muted">{caseStudy.role}</p>
            </section>

            <section id="solution">
              <h2 className="border-t border-line pt-4 text-[1.15rem] font-normal tracking-tight text-ink">
                <span className="mr-3 font-mono text-[0.6875rem] tabular-nums text-accent">04</span>
                Solution
              </h2>
              <ul className="mt-5 space-y-4">
                {caseStudy.solution.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-3 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section id="architecture">
              <h2 className="border-t border-line pt-4 text-[1.15rem] font-normal tracking-tight text-ink">
                <span className="mr-3 font-mono text-[0.6875rem] tabular-nums text-accent">05</span>
                Architecture
              </h2>
              <ArchitectureDiagram architecture={caseStudy.architecture} />
            </section>

            <section id="challenges">
              <h2 className="border-t border-line pt-4 text-[1.15rem] font-normal tracking-tight text-ink">
                <span className="mr-3 font-mono text-[0.6875rem] tabular-nums text-accent">06</span>
                Technical challenges
              </h2>
              <dl className="mt-6 space-y-7">
                {caseStudy.challenges.map((challenge) => (
                  <div key={challenge.title} className="border-t border-line pt-5">
                    <dt className="text-base font-semibold text-ink">{challenge.title}</dt>
                    <dd className="mt-2 text-sm leading-7 text-muted">{challenge.detail}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="decisions">
              <h2 className="border-t border-line pt-4 text-[1.15rem] font-normal tracking-tight text-ink">
                <span className="mr-3 font-mono text-[0.6875rem] tabular-nums text-accent">07</span>
                Engineering decisions
              </h2>
              <dl className="mt-6 space-y-7">
                {caseStudy.decisions.map((item) => (
                  <div key={item.decision} className="border-t border-line pt-5">
                    <dt className="text-base font-semibold text-ink">{item.decision}</dt>
                    <dd className="mt-2 text-sm leading-7 text-muted">{item.rationale}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="outcome">
              <h2 className="border-t border-line pt-4 text-[1.15rem] font-normal tracking-tight text-ink">
                <span className="mr-3 font-mono text-[0.6875rem] tabular-nums text-accent">08</span>
                Outcome
              </h2>
              <ul className="mt-5 space-y-4">
                {caseStudy.outcome.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-3 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-subtle">
                No performance or revenue figures are published for this engagement unless they
                can be verified and disclosed.
              </p>
            </section>

            <section id="stack">
              <h2 className="border-t border-line pt-4 text-[1.15rem] font-normal tracking-tight text-ink">
                <span className="mr-3 font-mono text-[0.6875rem] tabular-nums text-accent">09</span>
                Technology stack
              </h2>
              <TechList items={caseStudy.stack} className="mt-5" />
            </section>

            <section id="links">
              <h2 className="border-t border-line pt-4 text-[1.15rem] font-normal tracking-tight text-ink">
                <span className="mr-3 font-mono text-[0.6875rem] tabular-nums text-accent">10</span>
                Links
              </h2>
              {caseStudy.links.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {caseStudy.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-base text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
                      >
                        {link.label}
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 text-sm leading-6 text-subtle">
                  No public demo or repository link is available for this project.
                </p>
              )}
              <p className="mt-6 rounded-lg border border-dashed border-line-strong p-5 text-sm leading-6 text-subtle">
                {caseStudy.disclosure}
              </p>
            </section>
          </div>
        </div>
      </div>

      <Section className="border-t border-line">
        <h2 className="label text-subtle">Related projects</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/projects/${item.slug}`}
                className="group flex h-full flex-col rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent"
              >
                <span className="label text-subtle">{item.category}</span>
                <span className="mt-3 text-base font-semibold text-ink group-hover:text-accent">
                  {item.name}
                </span>
                <span className="mt-2 text-sm leading-6 text-muted">{item.summary}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <ButtonLink href="/projects" variant="secondary">
            Back to all projects
          </ButtonLink>
        </div>
      </Section>
    </article>
  );
}
