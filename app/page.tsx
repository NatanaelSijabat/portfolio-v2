import { ArrowRight, ArrowUpRight } from "lucide-react";

import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { TechList } from "@/components/ui/tech-list";
import { earlyCareerNote, experience } from "@/data/experience";
import { featuredProjects } from "@/data/projects";
import {
  aboutIntro,
  approachPoints,
  certificates,
  education,
  principles,
  siteConfig,
  skillGroups,
} from "@/data/site";

const focusFacts = [
  { label: "Based in", value: `${siteConfig.location} (UTC+7)` },
  { label: "Experience", value: "Building software professionally since 2022" },
  { label: "Core stack", value: "TypeScript · Next.js · Hono · Node.js · Prisma" },
  { label: "Focus", value: "Web applications, APIs, integrations, data" },
];

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.title,
  url: siteConfig.url,
  description: siteConfig.description,
  address: { "@type": "PostalAddress", addressLocality: "Semarang", addressCountry: "ID" },
  sameAs: [siteConfig.github],
  knowsAbout: [
    "Full-stack web development",
    "Backend API design",
    "Payment gateway integration",
    "Database design and query optimisation",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universitas Maritim Raja Ali Haji",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
      />
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="blueprint pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-28">
          <p className="label text-accent">{siteConfig.eyebrow}</p>
          <h1 className="mt-6 max-w-4xl text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-[3.75rem]">
            {siteConfig.headline}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">{siteConfig.supporting}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="/projects" size="lg">
              Explore Projects
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
            <ButtonLink href={siteConfig.resumePath} variant="secondary" size="lg">
              View Resume
            </ButtonLink>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
            >
              github.com/NatanaelSijabat
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {siteConfig.email ? (
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
              >
                {siteConfig.email}
              </a>
            ) : null}
            {siteConfig.linkedin ? (
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
              >
                LinkedIn
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        </div>

        <dl className="relative border-t border-line bg-surface/60">
          <div className="mx-auto grid w-full max-w-6xl gap-y-6 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
            {focusFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="label text-subtle">{fact.label}</dt>
                <dd className="mt-2 max-w-xs text-sm leading-6 text-muted">{fact.value}</dd>
              </div>
            ))}
          </div>
        </dl>
      </section>

      <Section id="about">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="Approach"
            title="Requirements first, then architecture."
            description={
              <>
                {aboutIntro.map((paragraph) => (
                  <p key={paragraph} className="mt-4 first:mt-0">
                    {paragraph}
                  </p>
                ))}
              </>
            }
          />
        </Reveal>

        <ol className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {approachPoints.map((point, index) => (
            <li key={point.title} className="border-t border-line pt-6">
              <p className="label text-accent">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-base font-semibold text-ink">{point.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{point.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="expertise">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Technical expertise"
            title="Grouped by engineering responsibility."
            description="Technologies used across professional, freelance, and personal work — with varying depth of experience rather than equal proficiency in every tool."
          />
        </Reveal>

        <div className="mt-12">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="grid gap-4 border-t border-line py-8 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-10"
            >
              <div>
                <h3 className="text-base font-semibold text-ink">{group.title}</h3>
                <p className="mt-2 text-sm leading-6 text-subtle">{group.summary}</p>
              </div>
              <TechList items={group.items} className="self-start" />
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Selected work"
            title="Case studies, not screenshots."
            description="Each project documents the problem, my actual contribution, the decisions behind the implementation, and the outcome. Client engagements are described at capability level only — no confidential code, data, or infrastructure."
          />
        </Reveal>

        <div className="mt-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={String(index + 1).padStart(2, "0")}
            />
          ))}
        </div>

        <div className="mt-10">
          <ButtonLink href="/projects" variant="secondary">
            All projects
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </div>
      </Section>

      <Section id="experience">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Professional experience"
            title="Six engagements, one direction."
            description="Reverse-chronological. Responsibilities and outcomes are listed as they were delivered on each engagement."
          />
        </Reveal>

        <ol className="mt-12">
          {experience.map((entry) => (
            <li
              key={`${entry.company}-${entry.period}`}
              className="border-t border-line py-9 first:border-t-0 first:pt-0"
            >
              <div className="grid gap-4 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10">
                <div>
                  <p className="font-mono text-xs text-subtle">{entry.period}</p>
                  <p className="label mt-3 text-subtle">{entry.engagement}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-ink">
                    {entry.position}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent">{entry.company}</p>
                  <p className="mt-1 text-sm text-subtle">{entry.context}</p>
                  <ul className="mt-4 space-y-2">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 text-sm leading-6 text-muted">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 size-1 shrink-0 rounded-full bg-line-strong"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <TechList items={entry.stack} className="mt-5" limit={8} />
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-2 border-t border-line pt-6 text-sm leading-6 text-subtle">
          {earlyCareerNote}
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="label text-subtle">Education</h3>
            <ul className="mt-5 space-y-5">
              {education.map((item) => (
                <li key={item.programme} className="border-t border-line pt-5">
                  <p className="text-sm font-semibold text-ink">{item.programme}</p>
                  <p className="mt-1 text-sm text-muted">{item.institution}</p>
                  <p className="mt-1 font-mono text-xs text-subtle">{item.period}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="label text-subtle">Hackathons & certificates</h3>
            <ul className="mt-5 space-y-5">
              {certificates.map((item) => (
                <li key={item.reference} className="border-t border-line pt-5">
                  <p className="text-sm font-semibold text-ink">{item.name}</p>
                  <p className="mt-1 text-sm text-muted">
                    {item.issuer} · {item.role} · {item.awarded}
                  </p>
                  <p className="mt-1 font-mono text-xs text-subtle">ID {item.reference}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="principles">
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="Engineering principles"
            title="How I make technical decisions."
          />
        </Reveal>

        <ol className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, index) => (
            <li key={principle.title} className="border-t border-line pt-6">
              <p className="label text-accent">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-base font-semibold text-ink">{principle.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{principle.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="contact">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div>
            <SectionHeading
              index="06"
              eyebrow="Contact"
              title="Let's build something useful."
              description="Whether you're hiring, collaborating on a product, or looking for an engineer to help solve a technical challenge, I'd be glad to connect."
            />
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={siteConfig.github} target="_blank" rel="noopener noreferrer">
                GitHub
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </ButtonLink>
              <ButtonLink href={siteConfig.resumePath} variant="secondary">
                Download Resume
              </ButtonLink>
              {siteConfig.linkedin ? (
                <ButtonLink
                  href={siteConfig.linkedin}
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </ButtonLink>
              ) : null}
            </div>
          </div>

          <div className="rounded-lg border border-line bg-surface p-6">
            <Badge tone="accent">How I work with teams</Badge>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
              <li>Async-friendly across time zones.</li>
              <li>Written decisions, shared contracts, reviewed pull requests.</li>
              <li>Comfortable owning a workflow end to end, frontend through deployment.</li>
            </ul>
            <p className="mt-5 border-t border-line pt-5 text-sm text-subtle">
              Prefer a different channel? The GitHub profile linked here is the current direct
              contact point.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
