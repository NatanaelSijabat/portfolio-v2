import type { Metadata } from "next";

import { WorkEntry } from "@/components/work-entry";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected engineering work: cooperative commerce and ride-hailing platforms, a public site with a media pipeline, a point-of-sale foundation, and a real-time exchange dashboard.",
  alternates: { canonical: "/projects" },
};

const container = "mx-auto w-full max-w-5xl px-5 sm:px-8";

export default function ProjectsPage() {
  return (
    <>
      <section className={`${container} pb-10 pt-14 sm:pt-20`}>
        <h1 className="max-w-3xl text-[2.05rem] font-normal leading-[1.16] tracking-tight text-ink sm:text-[2.5rem] sm:leading-[1.12]">
          Five projects, and the parts worth explaining.
        </h1>
        <p className="mt-6 max-w-2xl text-[0.9375rem] leading-7 text-muted">
          Each page covers the problem, what I actually did, the decisions I would defend in a code
          review, and what came out of it. Client engagements are described at capability level: no
          source code, production data, credentials, or internal infrastructure.
        </p>
      </section>

      <section className={`${container} pb-16 sm:pb-20`}>
        <div>
          {projects.map((project) => (
            <WorkEntry key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
