import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { SectionBar } from "@/components/section-bar";
import { TechList } from "@/components/ui/tech-list";
import { experience } from "@/data/experience";
import {
  aboutIntro,
  approachPoints,
  certificates,
  education,
  principles,
  siteConfig,
  skillGroups,
} from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Natanael Sijabat works: approach to building software, full role history with responsibilities, technologies, engineering principles, and background.",
  alternates: { canonical: "/about" },
};

const container = "mx-auto w-full max-w-5xl px-5 sm:px-8";

export default function AboutPage() {
  return (
    <>
      <section className={`${container} pb-12 pt-14 sm:pt-20`}>
        <h1 className="max-w-3xl text-[2.05rem] font-normal leading-[1.16] tracking-tight text-ink sm:text-[2.9rem] sm:leading-[1.12]">
          The longer version.
        </h1>
        <p className="mt-7 max-w-2xl text-[1.0625rem] leading-8 text-ink">
          The homepage is the short version. This page is the rest of it: how I work, what I have
          actually done on each engagement, the tools I reach for, and how I make decisions.
        </p>
        {aboutIntro.map((paragraph) => (
          <p key={paragraph} className="mt-5 max-w-2xl text-[0.9375rem] leading-7 text-muted">
            {paragraph}
          </p>
        ))}
      </section>

      <section className={`${container} pb-12 sm:pb-14`}>
        <SectionBar title="How I work" meta={`${approachPoints.length} things I try to hold to`} />
        <ol className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {approachPoints.map((point, index) => (
            <li key={point.title}>
              <p className="font-mono text-[0.6875rem] tabular-nums text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-base font-semibold leading-snug text-ink">{point.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{point.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="experience" className={`${container} scroll-mt-20 pb-12 sm:pb-14`}>
        <SectionBar
          title="Experience"
          meta="most recent first"
          action={
            <Link
              href={siteConfig.resumePath}
              className="label inline-flex items-center gap-1.5 text-subtle transition-colors hover:text-accent"
            >
              Also in the resume (PDF)
            </Link>
          }
        />
        <ol className="mt-6">
          {experience.map((entry) => (
            <li
              key={`${entry.company}-${entry.period}`}
              className="grid gap-x-8 gap-y-3 border-t border-line py-8 first:border-t-0 first:pt-2"
            >
              <div className="grid gap-x-8 gap-y-2 sm:grid-cols-[9rem_minmax(0,1fr)]">
                <div>
                  <p className="font-mono text-xs tabular-nums text-subtle">{entry.period}</p>
                  <p className="mt-1 font-mono text-[0.6875rem] text-subtle">{entry.engagement}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-snug text-ink">{entry.position}</h3>
                  <p className="mt-1 text-sm text-accent">{entry.company}</p>
                  <p className="mt-0.5 text-sm text-subtle">{entry.context}</p>
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
      </section>

      <section className={`${container} pb-12 sm:pb-14`}>
        <SectionBar title="What I use" meta="varying depth, not equal depth" />
        <dl className="mt-6 space-y-5">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="grid gap-x-8 gap-y-1 sm:grid-cols-[11rem_minmax(0,1fr)]"
            >
              <dt className="text-sm font-medium text-ink">{group.title}</dt>
              <dd className="text-sm leading-6 text-muted">
                {group.items.join(", ")}
                <span className="mt-1 block text-xs text-subtle">{group.summary}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={`${container} pb-12 sm:pb-14`}>
        <SectionBar title="How I decide" meta="working principles" />
        <ol className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <li key={principle.title}>
              <p className="font-mono text-[0.6875rem] tabular-nums text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-base font-semibold leading-snug text-ink">
                {principle.title}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{principle.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${container} pb-16 sm:pb-20`}>
        <SectionBar title="Background" />
        <div className="mt-6 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="label text-subtle">Education</h3>
            <ul className="mt-4 space-y-4">
              {education.map((item) => (
                <li key={item.programme}>
                  <p className="text-sm font-medium text-ink">{item.programme}</p>
                  <p className="mt-0.5 text-sm text-muted">{item.institution}</p>
                  <p className="mt-0.5 font-mono text-xs tabular-nums text-subtle">{item.period}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="label text-subtle">Hackathons</h3>
            <ul className="mt-4 space-y-4">
              {certificates.map((item) => (
                <li key={item.reference}>
                  <p className="text-sm font-medium text-ink">{item.name}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {item.issuer} · {item.role} · {item.awarded}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-subtle">ID {item.reference}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6 text-sm">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-1.5 font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
          >
            Get in touch
          </Link>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
          >
            GitHub
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link
            href="/projects"
            className="text-muted transition-colors hover:text-accent"
          >
            Projects
          </Link>
        </p>
      </section>
    </>
  );
}
