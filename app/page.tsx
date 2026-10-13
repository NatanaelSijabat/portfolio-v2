import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { SectionBar } from "@/components/section-bar";
import { WorkEntry } from "@/components/work-entry";
import { experience } from "@/data/experience";
import { featuredProjects, projects } from "@/data/projects";
import { siteConfig, workAreas } from "@/data/site";

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

const container = "mx-auto w-full max-w-5xl px-5 sm:px-8";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
      />

      <section className="relative border-b border-line">
        <div
          aria-hidden="true"
          className="ruled pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
        />
        <div
          className={`${container} relative grid gap-10 pb-14 pt-14 sm:pb-16 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16`}
        >
          <div>
            <h1 className="max-w-3xl text-[2.05rem] font-normal leading-[1.16] tracking-tight text-ink sm:text-[2.9rem] sm:leading-[1.12]">
              {siteConfig.headline}
            </h1>

            <p className="mt-7 max-w-2xl text-[1.0625rem] leading-8 text-ink">
              I am Natanael, a fullstack engineer in Semarang, Indonesia. Most of my work is
              business software: cooperative and commerce platforms, payment and delivery
              integrations, operational dashboards, and the APIs that hold them together.
            </p>

            <p className="mt-5 max-w-2xl text-[0.9375rem] leading-7 text-muted">
              The parts I enjoy are rarely the screens. A retried payment that must not become a
              second order. Inventory that stays correct when two cashiers sell the last unit at
              the same moment. Totals that disagree because something trusted the client.
            </p>

            <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <a
                href="#work"
                className="inline-flex items-center gap-1.5 font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
              >
                {featuredProjects.length} projects below
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </a>
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
            </p>
          </div>

          <aside className="border-t border-line pt-4 lg:border-t-0 lg:pt-2">
            <p className="label text-subtle">By the way</p>
            <p className="mt-3 text-[0.9375rem] leading-6 text-muted">
              Ask me about idempotency keys. It comes up more often than you would expect.
            </p>
          </aside>
        </div>
      </section>

      <section className={`${container} py-12 sm:py-14`}>
        <SectionBar title="What I work on" meta="the short version" />
        <dl className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {workAreas.map((item) => (
            <div
              key={item.area}
              className="grid gap-x-4 gap-y-1 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
            >
              <dt className="text-sm font-medium text-ink">{item.area}</dt>
              <dd className="text-sm leading-6 text-muted">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="work" className={`${container} scroll-mt-20 pb-12 sm:pb-14`}>
        <SectionBar
          title="Selected work"
          action={
            <Link
              href="/projects"
              className="label inline-flex items-center gap-1.5 text-subtle transition-colors hover:text-accent"
            >
              All {projects.length} projects
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          }
        />
        <div className="mt-2">
          {featuredProjects.map((project) => (
            <WorkEntry key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section id="experience" className={`${container} scroll-mt-20 pb-12 sm:pb-14`}>
        <SectionBar
          title="Experience"
          action={
            <Link
              href="/about#experience"
              className="label inline-flex items-center gap-1.5 text-subtle transition-colors hover:text-accent"
            >
              Full responsibilities
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          }
        />
        <ul className="mt-2">
          {experience.map((entry) => (
            <li
              key={`${entry.company}-${entry.period}`}
              className="grid gap-x-8 gap-y-1 border-t border-line py-4 first:border-t-0 sm:grid-cols-[9rem_minmax(0,1fr)]"
            >
              <div className="sm:pt-0.5">
                <p className="font-mono text-xs tabular-nums text-subtle">{entry.period}</p>
                <p className="mt-1 font-mono text-[0.6875rem] text-subtle">{entry.engagement}</p>
              </div>
              <p className="text-[0.9375rem] leading-7 text-ink">
                {entry.position}
                <span className="text-muted"> — {entry.company}</span>
                <span className="mt-0.5 block text-sm text-subtle">{entry.context}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className={`${container} scroll-mt-20 pb-16 sm:pb-20`}>
        <SectionBar title="Say hello, or go read the code." />
        <p className="mt-6 max-w-2xl text-[0.9375rem] leading-7 text-muted">
          GitHub is where I actually am. The resume covers the detail this page leaves out, and the
          individual project pages explain the decisions.
        </p>
        <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
          >
            GitHub
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link
            href={siteConfig.resumePath}
            className="text-muted transition-colors hover:text-accent"
          >
            Resume (PDF)
          </Link>
          {siteConfig.email ? (
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-muted transition-colors hover:text-accent"
            >
              {siteConfig.email}
            </a>
          ) : null}
          {siteConfig.linkedin ? (
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-accent"
            >
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
        </p>
      </section>
    </>
  );
}
