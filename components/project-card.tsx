import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { TechList } from "@/components/ui/tech-list";
import type { Project } from "@/data/types";

export function ProjectCard({
  project,
  index,
  layout = "stacked",
}: {
  project: Project;
  index: string;
  layout?: "stacked" | "compact";
}) {
  return (
    <article className="group relative border-t border-line py-10 first:border-t-0 sm:py-12">
      <div className="grid gap-6 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-10">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 lg:block">
          <p className="label text-accent">{index}</p>
          <p className="label text-subtle lg:mt-4">{project.category}</p>
          <p className="font-mono text-[0.6875rem] text-subtle lg:mt-2">{project.period}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors group-hover:text-accent"
            >
              {project.name}
              <span className="absolute inset-0" aria-hidden="true" />
            </Link>
          </h3>
          <p className="mt-1 font-mono text-[0.6875rem] text-subtle">{project.organisation}</p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted">{project.summary}</p>

          {layout === "stacked" ? (
            <dl className="mt-6 grid max-w-3xl gap-5 sm:grid-cols-2">
              <div>
                <dt className="label text-subtle">The problem</dt>
                <dd className="mt-2 text-sm leading-6 text-muted">{project.problem}</dd>
              </div>
              <div>
                <dt className="label text-subtle">My contribution</dt>
                <dd className="mt-2 text-sm leading-6 text-muted">{project.role}</dd>
              </div>
            </dl>
          ) : null}

          <TechList items={project.stack} className="mt-6" limit={10} />

          <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            Read the case study
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </p>
          {project.confidential ? (
            <span className="ml-3 font-mono text-[0.6875rem] text-subtle">
              Sanitised — client engagement
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
