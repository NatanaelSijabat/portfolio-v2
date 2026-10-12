import type { SkillGroup } from "./types";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * Every contact channel is nullable on purpose. Anything the candidate has not
 * confirmed is left empty and omitted from the UI, so the site never renders a
 * dead link or an unverified claim.
 */
export const siteConfig = {
  name: "Natanael Sijabat",
  title: "Fullstack Engineer",
  eyebrow: "FULLSTACK ENGINEER · SOFTWARE DEVELOPER",
  headline: "Building reliable software, from interface to infrastructure.",
  supporting:
    "I build web applications and backend systems that solve real business problems, combining modern frontend experiences with reliable APIs, data-driven architecture, and production-focused engineering.",
  description:
    "Fullstack engineer in Semarang, Indonesia. I build web applications, backend APIs, integrations, and business-oriented software systems — with case studies covering cooperative commerce, payment and delivery workflows, and production operations.",
  location: "Semarang, Indonesia",
  url: rawSiteUrl.replace(/\/$/, ""),
  resumePath: "/resume.pdf",
  email: null as string | null,
  github: "https://github.com/NatanaelSijabat",
  linkedin: null as string | null,
  /** Availability is intentionally unset: no employment status is claimed on the site. */
  availability: null as string | null,
} as const;

export const navItems = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
] as const;

export const aboutIntro = [
  "I am a fullstack engineer based in Semarang, Indonesia, and my work sits between business requirements and production systems. That has meant cooperative and commerce platforms, operational dashboards, payment and delivery integrations, and the APIs behind all of them.",
  "Most of my time goes into the unglamorous parts that decide whether software survives contact with real users: clear API boundaries, validated inputs, consistent transaction state, sensible indexes, and interfaces that stay usable as the feature set grows.",
];

export const approachPoints = [
  {
    title: "Requirements before implementation",
    detail:
      "I start from the workflow, the constraints, and the people using the system, then decide what is actually worth building.",
  },
  {
    title: "Architecture that stays maintainable",
    detail:
      "Routes, services, schemas, and domain features stay separated so a change in one workflow does not ripple through everything else.",
  },
  {
    title: "Frontend connected to real contracts",
    detail:
      "Interfaces are built against typed, validated API contracts instead of assumptions about what the backend will return.",
  },
  {
    title: "Integrations and transaction workflows",
    detail:
      "Payment gateways, delivery services, and third-party APIs are integrated with retries, idempotency, and explicit status handling.",
  },
  {
    title: "Performance measured against bottlenecks",
    detail:
      "Caching, indexing, and query work are targeted at observed problems rather than applied everywhere by default.",
  },
  {
    title: "Software teams can keep extending",
    detail:
      "Documentation, migrations, tests, and repeatable deployments matter as much as the features themselves.",
  },
];

export const principles = [
  {
    title: "Maintainability over unnecessary complexity",
    detail:
      "The simplest structure that handles the real requirements wins. Abstraction is earned, not assumed up front.",
  },
  {
    title: "Explicit API contracts and data validation",
    detail:
      "Boundaries are typed and validated. Invalid or ambiguous input fails predictably instead of leaking into business logic.",
  },
  {
    title: "Security and privacy by design",
    detail:
      "Authentication, authorization scoping, and least-privilege access are part of the design, not a later hardening pass.",
  },
  {
    title: "Performance measured against real bottlenecks",
    detail:
      "Profile first. Query plans, caching, payload size, and render cost each get attention where the data says it matters.",
  },
  {
    title: "Reusable architecture without premature abstraction",
    detail:
      "Shared patterns emerge from two or three real cases, not from a single imagined future one.",
  },
  {
    title: "Reliable deployments and observable systems",
    detail:
      "Repeatable environments, documented configuration, and logs that make production behaviour explainable.",
  },
  {
    title: "Clear documentation and direct collaboration",
    detail:
      "Decisions are written down. Working with product, QA, and backend teams is part of the engineering job.",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend Engineering",
    summary: "Product interfaces built against typed data and real API contracts.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Vue.js",
      "Nuxt.js",
      "Tailwind CSS",
      "TanStack Query",
      "TanStack Table",
      "Zustand",
      "Redux Toolkit",
      "React Hook Form",
      "Zod",
      "Vite",
      "Capacitor",
    ],
  },
  {
    title: "Backend & API Development",
    summary: "Services and REST APIs with explicit boundaries and predictable failure modes.",
    items: [
      "Node.js",
      "Hono",
      "Bun",
      "Express.js",
      "NestJS",
      "PHP",
      "Laravel",
      "REST APIs",
      "Authentication & RBAC",
      "Idempotency",
      "Rate limiting",
      "Background workers",
      "OpenAPI documentation",
    ],
  },
  {
    title: "Databases & Data Modelling",
    summary: "Schemas, migrations, and query work that keep data consistent as usage grows.",
    items: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Prisma ORM",
      "Sequelize",
      "Redis",
      "Schema design",
      "Migrations",
      "Query optimisation",
      "Indexing",
      "Caching",
    ],
  },
  {
    title: "Integrations & Business Workflows",
    summary: "Third-party services connected to transaction state that has to stay correct.",
    items: [
      "Payment gateway integration",
      "Cooperative savings workflows",
      "Delivery rate services",
      "Multi-tenant authorization",
      "Order and payment state consistency",
      "Third-party API integration",
      "SEO and Open Graph metadata",
    ],
  },
  {
    title: "DevOps & Developer Tooling",
    summary: "Deployments, environments, and tooling that make releases repeatable.",
    items: [
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "Nginx",
      "Linux VPS",
      "SSL / Certbot",
      "Cloudflare DNS",
      "Cloudflare R2 & CDN",
      "cPanel",
      "Git",
      "Postman",
      "Browser developer tools",
    ],
  },
];

export const education = [
  {
    programme: "Bachelor of Informatics Engineering",
    institution: "Universitas Maritim Raja Ali Haji",
    period: "2015 – 2022",
  },
];

export const certificates = [
  {
    name: "IBM Bob Hackathon — Certificate of Completion",
    issuer: "lablab.ai",
    role: "Participant",
    awarded: "12 June 2026",
    reference: "CMQAZMHIA033DS601GX9TOM3A",
  },
  {
    name: "AMD Developer Hackathon — Certificate of Completion",
    issuer: "lablab.ai",
    role: "Participant",
    awarded: "17 June 2026",
    reference: "CMQHZY1SG02RTS601YYXBIR01",
  },
];
