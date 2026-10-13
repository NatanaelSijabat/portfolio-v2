import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { Project } from "@/data/types";

/**
 * A project as one row of an index: year in the margin, then the name, what it was, the
 * part that was actually interesting to solve, and the stack. No card, no screenshot.
 */
export function WorkEntry({ project }: { project: Project }) {
  return (
    <article className="group relative grid gap-x-8 gap-y-2 border-t border-line py-7 first:border-t-0 first:pt-6 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:py-8 sm:first:pt-7">
      <p className="font-mono text-xs tabular-nums text-subtle sm:pt-1.5">{project.year}</p>

      <div>
        <h3 className="flex items-baseline gap-2 text-[1.3rem] font-normal leading-snug">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors group-hover:text-accent"
          >
            {project.name}
            <span className="absolute inset-0" aria-hidden="true" />
          </Link>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 shrink-0 text-line-strong transition-all duration-200 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        </h3>

        <p className="mt-1.5 font-mono text-[0.6875rem] text-subtle">
          {project.organisation} · {project.period}
          {project.confidential ? " · described at capability level" : ""}
        </p>

        <p className="mt-3 max-w-2xl text-[0.9375rem] leading-7 text-muted">{project.summary}</p>

        <p className="mt-3.5 max-w-2xl text-[0.9375rem] leading-7 text-muted">
          <span className="label mr-2 text-accent">Interesting part</span>
          {project.highlight}
        </p>

        <p className="mt-3.5 font-mono text-[0.6875rem] leading-5 text-subtle">
          {project.stack.slice(0, 6).join(" · ")}
        </p>
      </div>
    </article>
  );
}
