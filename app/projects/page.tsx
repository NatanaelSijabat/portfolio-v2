import type { Metadata } from "next";

import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering case studies covering cooperative commerce, ride-hailing workflows, public platforms, payment and delivery integrations, and a point-of-sale foundation.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <Section bordered={false} className="pb-4 pt-16 sm:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="Case studies"
          title="Projects and the decisions behind them."
          description="Each case study documents the problem, the role, the implementation decisions, and the verified outcome. Where a project is a client engagement, the description stays at capability level: no source code, production data, credentials, or confidential infrastructure."
        />
      </Section>

      <Section bordered={false} className="pt-8">
        <div>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={String(index + 1).padStart(2, "0")}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
