export type ProjectCategory =
  | "Business Systems"
  | "Integrated Systems"
  | "Web Platform"
  | "Engineering Foundation"
  | "Frontend Engineering";

export type ArchitectureLayer = {
  label: string;
  items: string[];
};

export type CaseStudy = {
  overview: string;
  problem: string;
  role: string;
  solution: string[];
  architecture: {
    summary: string;
    client: ArchitectureLayer;
    service: ArchitectureLayer;
    data: ArchitectureLayer;
    integrations?: string[];
  };
  challenges: { title: string; detail: string }[];
  decisions: { decision: string; rationale: string }[];
  outcome: string[];
  stack: string[];
  disclosure: string;
  links: { label: string; href: string }[];
};

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  summary: string;
  problem: string;
  role: string;
  stack: string[];
  period: string;
  organisation: string;
  confidential: boolean;
  featured: boolean;
  caseStudy: CaseStudy;
};

export type Experience = {
  company: string;
  position: string;
  engagement: "Full-time" | "Freelance";
  period: string;
  start: string;
  context: string;
  bullets: string[];
  stack: string[];
};

export type SkillGroup = {
  title: string;
  summary: string;
  items: string[];
};
