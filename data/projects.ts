import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "collab-coop-kdkmp",
    name: "Cooperative Commerce Ecosystem",
    category: "Business Systems",
    organisation: "KSP Nasari",
    period: "Apr 2026 – Sep 2026",
    confidential: true,
    featured: true,
    summary:
      "A multi-tenant platform covering merchant management, marketplace, cooperative payments, courier services, and member-facing applications.",
    problem:
      "Merchants, stores, branches, payments, delivery, and members all refer to the same entities, so every workflow has to agree on identifiers, permissions, and transaction state. The hard part is not building a screen — it is keeping one operationally consistent system while several feature areas evolve at once.",
    role: "Senior Full-Stack Developer. I worked across backend services, payment and delivery integrations, merchant self-service, and the companion mobile application.",
    stack: [
      "Hono",
      "Bun",
      "TypeScript",
      "Prisma",
      "MongoDB",
      "Redis",
      "React",
      "Vite",
      "Capacitor",
      "TanStack Query",
      "Zustand",
      "Zod",
      "Tailwind CSS",
      "Docker",
      "Nginx",
      "GitHub Actions",
    ],
    caseStudy: {
      overview:
        "A cooperative digital ecosystem that connects cooperative entities, branches, merchants, stores, and members in one platform. It covers merchant and product management, marketplace and order flows, cooperative payment workflows, courier and delivery handling, and member-facing applications including a Capacitor mobile client.",
      problem:
        "The feature areas are not independent apps. A store belongs to a merchant, a merchant belongs to a cooperative entity, an order references a branch, a payment references an order, and a delivery references an address. Each of those relationships is also an authorization boundary. When several workflows share entities like this, inconsistent identifiers, duplicated submissions, or unclear ownership rules show up as real production defects rather than cosmetic bugs.",
      role: "I was a senior full-stack developer on the ecosystem. My work covered backend services and domain modelling, payment and delivery integrations, the ride-hailing flow, merchant self-service screens, and the companion mobile application built with React and Capacitor. I also worked on API and database performance, OpenAPI documentation, and deployment validation.",
      solution: [
        "Separated backend code by responsibility — routes, services, schemas, and domain features — so each workflow had an obvious home and could be reviewed in isolation.",
        "Validated every request at the boundary with typed schemas, so invalid or ambiguous input fails predictably instead of leaking into business logic.",
        "Made transaction entry points idempotent, so a retried or duplicated request resolves to the same order and payment state instead of creating a second one.",
        "Scoped authorization to the actual tenant graph: user, branch, cooperative entity, merchant, and store, rather than a single global role check.",
        "Built the mobile client as a typed React application with server-state caching and form validation that mirrors the API contracts.",
        "Maintained OpenAPI documentation as the shared reference between the backend, the mobile client, and the web surfaces.",
      ],
      architecture: {
        summary:
          "A simplified, sanitised view of how the platform is layered. Internal service boundaries, hosting topology, and vendor configuration are intentionally not shown.",
        client: {
          label: "Clients",
          items: [
            "Member mobile app (React, Vite, Capacitor)",
            "Merchant self-service surfaces",
            "Operations and branch tooling",
          ],
        },
        service: {
          label: "Application services",
          items: [
            "REST API (Hono on Bun)",
            "Domain services for orders, payments, delivery, and ride workflows",
            "Validation and authorization middleware",
          ],
        },
        data: {
          label: "Data layer",
          items: ["Prisma models", "Document store for domain records", "Redis caching layer"],
        },
        integrations: [
          "Payment gateway integration",
          "Cooperative savings payment workflows",
          "Delivery rate service integration",
        ],
      },
      challenges: [
        {
          title: "Duplicate and retried transactions",
          detail:
            "Payment confirmations and order creation can arrive twice from slow networks or client retries. Idempotency keys plus validation inside the transaction boundary keep a repeated request from producing a second order or a second payment record.",
        },
        {
          title: "Multi-tenant authorization",
          detail:
            "Access has to resolve through the relationship chain rather than a global role. Authorization checks are scoped to the entity the caller actually belongs to, which keeps branch and merchant data separated.",
        },
        {
          title: "Ride lifecycle consistency",
          detail:
            "Quotation, booking, driver assignment, tracking, completion, and cancellation are one state machine. Modelling the transitions explicitly means the rider, the driver, and operations see the same answer about a trip in progress.",
        },
        {
          title: "Read performance under operational load",
          detail:
            "Frequently read catalogue and configuration paths are cached, while anything that changes transaction state stays authoritative in the database. Caching was applied to observed hot paths, not by default.",
        },
      ],
      decisions: [
        {
          decision: "Validation and idempotency at the API boundary",
          rationale:
            "Payment and order endpoints are the expensive places to be wrong. Validating input and deduplicating requests before business logic runs keeps the domain services honest and makes retries safe.",
        },
        {
          decision: "Server-authoritative totals and statuses",
          rationale:
            "Clients can display and preview values, but the server recomputes amounts and owns status transitions. This removes a whole class of client-side integrity bugs.",
        },
        {
          decision: "Domain-oriented module layout over layer-only organisation",
          rationale:
            "Grouping by domain feature keeps a change to one workflow contained. Shared infrastructure stays in a small, explicit set of libraries instead of becoming a catch-all.",
        },
        {
          decision: "OpenAPI documentation as a contract artefact",
          rationale:
            "With web, mobile, and backend consumers, a written contract removes guesswork and shortens integration time.",
        },
      ],
      outcome: [
        "Delivered the merchant, marketplace, payment, delivery, and ride workflows as one connected platform rather than separate tools.",
        "Established transaction handling that tolerates retries and duplicate submissions without creating duplicate orders or payments.",
        "Left the codebase with documented API contracts, layered domain modules, and deployment validation in place, so the next feature area does not require restructuring what exists.",
      ],
      stack: [
        "Hono",
        "Bun",
        "TypeScript",
        "Prisma",
        "MongoDB",
        "Redis",
        "React",
        "Vite",
        "Capacitor",
        "TanStack Query",
        "Zustand",
        "Zod",
        "Tailwind CSS",
        "Docker",
        "Nginx",
        "GitHub Actions",
      ],
      disclosure:
        "Client engagement. Source code, production data, credentials, internal service topology, and vendor configuration are confidential. This case study is limited to capability-level information that can be shared publicly.",
      links: [],
    },
  },
  {
    slug: "colab-ride",
    name: "Ride-Hailing Workflows",
    category: "Integrated Systems",
    organisation: "KSP Nasari",
    period: "Apr 2026 – Sep 2026",
    confidential: true,
    featured: false,
    summary:
      "End-to-end ride flows: quotation, booking, driver search and assignment, live tracking, trip completion, ratings, and cancellation.",
    problem:
      "A single ride request touches pricing, matching, live location, order state, and payment. Any of those steps can fail, stall, or repeat, and the rider, the driver, and the operations team all need the same answer about what happened.",
    role: "Full-Stack Developer. I implemented the ride workflows in the ecosystem backend and connected them to the mobile client.",
    stack: [
      "Hono",
      "Bun",
      "TypeScript",
      "Prisma",
      "MongoDB",
      "Redis",
      "React",
      "Vite",
      "Capacitor",
      "TanStack Query",
      "Zod",
    ],
    caseStudy: {
      overview:
        "A ride-hailing flow inside a cooperative services platform. Riders request a trip, receive a quotation, get matched with a driver, follow the trip while it is in progress, and complete it with a rating. Operators need the same trip history for support and reconciliation.",
      problem:
        "Ride workflows are state machines with money and time attached. Driver assignment is competitive — two requests can race for the same available driver. Tracking updates arrive continuously and can be delayed or missed. Cancellations and completions both need to leave the trip in a state that payment and history can rely on.",
      role: "I implemented the ride workflows on the backend and wired them into the mobile client: quotation, booking and order creation, driver search and assignment, live tracking, trip completion, ratings, ride history, cancellation, and driver communication.",
      solution: [
        "Modelled the trip as an explicit lifecycle with defined transitions, so every consumer reads the same state rather than inferring it.",
        "Computed quotations server-side and created the order only after the quotation was accepted, keeping pricing out of the client's control.",
        "Made order creation idempotent so a retried booking request resolves to the existing trip instead of starting a second one.",
        "Handled driver assignment as a guarded transition, so a driver who is already taken cannot be assigned to a concurrent request.",
        "Kept tracking updates on a channel that degrades gracefully when updates are delayed, with the client showing the last known position instead of an empty state.",
        "Exposed trip history and cancellation as first-class operations so support and reconciliation work against the same records as the rider app.",
      ],
      architecture: {
        summary:
          "The ride flow sits on the shared platform services. The diagram is simplified and sanitised; internal services and infrastructure are not shown.",
        client: {
          label: "Clients",
          items: ["Member mobile app", "Driver-facing screens", "Operations view"],
        },
        service: {
          label: "Ride services",
          items: [
            "Quotation and booking endpoints",
            "Assignment and lifecycle transitions",
            "Tracking channel handling",
          ],
        },
        data: {
          label: "State and storage",
          items: ["Trip and order records", "Driver availability state", "Cached read models"],
        },
        integrations: ["Delivery and location rate services", "Payment confirmation flow"],
      },
      challenges: [
        {
          title: "Concurrent driver assignment",
          detail:
            "Two trips can be matched to the same driver at nearly the same moment. Assignment is guarded so availability changes exactly once, and the losing request is told to search again instead of silently succeeding.",
        },
        {
          title: "Tracking without over-fetching",
          detail:
            "Position updates are frequent and mostly disposable, so they are kept off the transaction path and cached where possible. The trip record stays the source of truth for state, not for every coordinate.",
        },
        {
          title: "Cancellation and completion paths",
          detail:
            "Both are terminal transitions with different downstream effects on payment and history. Treating them as explicit transitions kept reconciliation understandable.",
        },
      ],
      decisions: [
        {
          decision: "One authoritative trip state machine",
          rationale:
            "Client-side convenience state is fine for the UI, but the server decides what a trip is. That removed a class of contradictory screens between rider, driver, and operations.",
        },
        {
          decision: "Server-computed fares with client-side preview",
          rationale:
            "Previews keep the interface responsive while the authoritative amount is calculated where it can be trusted and audited.",
        },
        {
          decision: "Idempotent booking submissions",
          rationale:
            "Mobile networks retry. Making booking idempotent prevents duplicated trips and duplicated charges from the most common client behaviour.",
        },
      ],
      outcome: [
        "Shipped the complete ride flow — quotation through completion, rating, history, and cancellation — as part of the wider platform.",
        "Kept rider, driver, and operations views aligned on trip state instead of diverging under retries or delayed updates.",
      ],
      stack: [
        "Hono",
        "Bun",
        "TypeScript",
        "Prisma",
        "MongoDB",
        "Redis",
        "React",
        "Vite",
        "Capacitor",
        "TanStack Query",
        "Zustand",
        "Zod",
      ],
      disclosure:
        "Client engagement. Implementation details, internal endpoints, production data, and infrastructure configuration are confidential and are not reproduced here.",
      links: [],
    },
  },
  {
    slug: "himapersis-v2",
    name: "Public Site, Dashboard & Media Pipeline",
    category: "Web Platform",
    organisation: "HimaPersis (freelance)",
    period: "Mar 2026",
    confidential: false,
    featured: true,
    summary:
      "A public website, member dashboard, and content backend with an image and document pipeline running on Cloudflare R2 and a containerised deployment.",
    problem:
      "A membership organisation needed one place for public information, member and cadre records, territorial data, and editorial content — while non-technical staff needed to publish safely, and the public side had to stay fast on modest hosting.",
    role: "Freelance full-stack developer and DevOps. I built the public site, the dashboard, the backend modules, the media pipeline, and the deployment setup.",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "NextAuth",
      "Hono",
      "Bun",
      "Prisma",
      "MySQL",
      "Sharp",
      "Cloudflare R2",
      "Docker Compose",
      "Nginx",
      "Certbot",
      "GitHub Actions",
    ],
    caseStudy: {
      overview:
        "A public website and an authenticated dashboard for a student membership organisation. The public side presents organisational information and content; the dashboard manages members and cadres, territorial data, and editorial material, including uploaded images and documents.",
      problem:
        "Content management and membership records pull in opposite directions: the dashboard needs privileged, authenticated access, while the public site needs to be fast and cacheable. Uploads add a third concern — image and PDF handling, storage, and delivery — that should not sit on the application server or block a request.",
      role: "I was the freelance full-stack developer and the DevOps owner. I built the Next.js public site and dashboard, the Hono/Bun backend modules for authentication, records, territorial data, content, and analytics, the R2 media pipeline, and the Docker/Nginx deployment with automated releases.",
      solution: [
        "Built the public site and dashboard on Next.js App Router with typed API access, server rendering for public content, and authenticated dashboard routes.",
        "Implemented backend modules covering authentication, member and cadre records, territorial data, content management, and dashboard analytics.",
        "Moved media handling off the request path: uploads go to Cloudflare R2, with Sharp processing and background workers generating derived image sizes, PDF handling, and Open Graph assets.",
        "Applied role-based access control across public pages, dashboard routes, and protected API endpoints so the same rule set governs both the UI and the API.",
        "Containerised the stack with Docker Compose behind an Nginx reverse proxy with Certbot-managed TLS, and kept staging and production configurations aligned.",
        "Automated releases with GitHub Actions so deployment did not depend on manual steps on the server.",
      ],
      architecture: {
        summary:
          "Public traffic is served from the Next.js application, authenticated traffic from the dashboard routes, and media from Cloudflare R2 through the CDN. Uploads are processed by background workers rather than during the request.",
        client: {
          label: "Clients",
          items: ["Public website", "Authenticated dashboard", "Content editors"],
        },
        service: {
          label: "Application",
          items: [
            "Next.js 15 App Router (public + dashboard)",
            "NextAuth session and role handling",
            "Hono on Bun API modules",
            "Background workers for media processing",
          ],
        },
        data: {
          label: "Data and media",
          items: ["MySQL via Prisma", "Cloudflare R2 object storage", "CDN delivery for derived assets"],
        },
        integrations: ["Cloudflare DNS", "Sharp image processing", "Open Graph image generation"],
      },
      challenges: [
        {
          title: "Keeping uploads off the request path",
          detail:
            "Image and PDF processing is slow and bursty. Handling it in background workers keeps uploads responsive and stops a large file from occupying an application worker.",
        },
        {
          title: "Consistent authorization across surfaces",
          detail:
            "Public pages, dashboard routes, and API endpoints all needed the same role rules. Centralising the check prevented drift between what the UI showed and what the API allowed.",
        },
        {
          title: "Environment parity",
          detail:
            "Staging and production were configured from the same container definitions, so a release could be validated before it reached production.",
        },
      ],
      decisions: [
        {
          decision: "Object storage and CDN for media instead of local disk",
          rationale:
            "Media is the least predictable part of the storage profile. R2 with CDN delivery keeps the application server replaceable and makes deploys less risky.",
        },
        {
          decision: "Server rendering for public content",
          rationale:
            "Public pages need to be indexable, fast on first load, and cacheable, which server rendering provides without shipping a large client bundle.",
        },
        {
          decision: "One backend module per domain concern",
          rationale:
            "Authentication, records, territorial data, content, and analytics change for different reasons. Keeping them separate made the dashboard features reviewable and testable in isolation.",
        },
      ],
      outcome: [
        "Delivered the public site, the member dashboard, and the content backend as one system with a shared authorization model.",
        "Media handling moved to R2 with background processing, so uploads and page rendering no longer compete for the same resources.",
        "Deployment is reproducible: containerised services, aligned staging and production configuration, and automated releases.",
      ],
      stack: [
        "Next.js 15",
        "React 19",
        "TypeScript",
        "NextAuth",
        "Hono",
        "Bun",
        "Prisma",
        "MySQL",
        "Tailwind CSS",
        "Sharp",
        "Cloudflare R2",
        "Docker Compose",
        "Nginx",
        "Certbot",
        "GitHub Actions",
      ],
      disclosure:
        "Public project. The live site is available to review; administrative data and infrastructure credentials are not reproduced here.",
      links: [{ label: "himapersis.id", href: "https://himapersis.id" }],
    },
  },
  {
    slug: "pos-core",
    name: "POS Core — Modular Monolith Foundation",
    category: "Engineering Foundation",
    organisation: "Personal project",
    period: "2026",
    confidential: false,
    featured: true,
    summary:
      "A production-oriented point-of-sale foundation: Hono and TypeScript on Bun, PostgreSQL via Prisma, and Redis, built around ledger-based inventory and idempotent checkout.",
    problem:
      "Point-of-sale systems fail in expensive ways: double-charged orders, oversold stock, and inventory numbers that drift away from what is physically on the shelf. Those failures are data-model problems long before they are interface problems.",
    role: "Personal project. I designed and built the data model, the API, and the invariants that the rest of the system depends on.",
    stack: [
      "Hono",
      "Bun",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Zod",
      "Vitest",
      "Docker Compose",
    ],
    caseStudy: {
      overview:
        "A point-of-sale backend foundation built as a modular monolith. It covers authentication, product and variant lookup, checkout, returns, offline synchronisation, and a cash ledger — with the money and inventory invariants enforced server-side.",
      problem:
        "Retail checkout has three failure modes that cost real money: an order submitted twice, a stock decrement that oversells under concurrency, and totals that disagree between the client and the database. Treating inventory as a mutable number on a product row makes all three worse.",
      role: "I designed and implemented the project end to end: schema and migrations, domain services for checkout, returns, and inventory, the HTTP layer, and the test suite covering the money and idempotency rules.",
      solution: [
        "Represented money as integer minor units everywhere, so arithmetic never runs through floating point.",
        "Modelled inventory as a ledger of movements with a cached balance: every stock change writes a movement, and the balance is derived rather than authoritative.",
        "Made checkout a single database transaction covering the order, payments, inventory movements, cash movements, receipt, and audit record.",
        "Gave orders, payments, and returns unique idempotency keys, so a replayed request returns the existing record instead of creating a second one.",
        "Guarded stock decrements with a conditional update that only succeeds when enough quantity is available, returning a conflict when it is not.",
        "Added an offline sync endpoint that accepts a batch of queued checkouts and returns a per-item result, so a client coming back online can reconcile precisely.",
        "Validated request bodies at the boundary and scoped every query to the organisation and store.",
      ],
      architecture: {
        summary:
          "A single deployable API with domain modules for inventory, orders, and returns, a relational database for authoritative state, and Redis for cache and queueing concerns.",
        client: {
          label: "Clients",
          items: ["Point-of-sale client", "Cashier lookup by barcode or SKU", "Offline queue replay"],
        },
        service: {
          label: "API modules",
          items: [
            "Auth with JWT, RBAC, and store scoping",
            "Orders: checkout, confirmation, offline batch sync",
            "Inventory: race-safe ledger writer",
            "Returns: refund and restock",
          ],
        },
        data: {
          label: "Data layer",
          items: ["PostgreSQL via Prisma", "Inventory movements + cached balances", "Redis cache and queueing"],
        },
        integrations: ["Payment confirmation reconciliation for pending e-payments"],
      },
      challenges: [
        {
          title: "Overselling under concurrency",
          detail:
            "Two cashiers can sell the last unit at the same moment. The decrement is a conditional update that only succeeds while sufficient quantity remains; the loser receives a conflict instead of a negative balance.",
        },
        {
          title: "Duplicate submissions and retries",
          detail:
            "A cashier who taps twice, or a client that retries a slow request, must not create two sales. Unique idempotency keys on orders, payments, and returns make replay return the original row, with concurrent duplicates resolved inside the transaction.",
        },
        {
          title: "Offline operation",
          detail:
            "When connectivity drops, the client queues checkouts locally and replays them as a batch. The sync endpoint reports a result per item, so partial failures are visible rather than silently dropped.",
        },
        {
          title: "Auditability",
          detail:
            "Because inventory is a ledger and every checkout writes an audit record, the reason a balance changed is reconstructable after the fact instead of being a number nobody can explain.",
        },
      ],
      decisions: [
        {
          decision: "Ledger inventory instead of a mutable quantity column",
          rationale:
            "A ledger makes stock changes explainable and auditable. The cached balance stays as a read optimisation that can always be rebuilt from movements.",
        },
        {
          decision: "Server recomputes every total",
          rationale:
            "Client totals are treated as a preview. Recomputing on the server removes client-side integrity bugs and keeps receipts trustworthy.",
        },
        {
          decision: "Idempotency keys at the schema level",
          rationale:
            "Enforcing uniqueness in the database means correctness does not depend on application-level timing or on every code path remembering to check first.",
        },
        {
          decision: "Modular monolith over microservices",
          rationale:
            "One deployable unit with clear internal modules keeps transactions simple and operationally cheap, which is what a system at this scale actually needs.",
        },
      ],
      outcome: [
        "The repository documents ten passing unit tests covering money handling and idempotency behaviour, runnable without a database.",
        "Money, inventory, and checkout invariants are stated explicitly in the project README, so the rules are reviewable rather than implicit.",
        "The foundation is designed to be extended with reporting, purchasing, and multi-store operations without reworking the ledger or the checkout transaction.",
      ],
      stack: [
        "Hono",
        "Bun",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Redis",
        "Zod",
        "Vitest",
        "Docker Compose",
      ],
      disclosure:
        "Personal project. The repository is not published, so no source link is provided. The architecture and invariants described here are drawn from the project's own documentation.",
      links: [],
    },
  },
  {
    slug: "duitoken-dashboard",
    name: "Real-Time Exchange Dashboard",
    category: "Frontend Engineering",
    organisation: "DuiToken (freelance)",
    period: "Oct 2023",
    confidential: false,
    featured: false,
    summary:
      "A React dashboard that streams live cryptocurrency prices and metrics using Server-Sent Events, with analytics components built for continuous updates.",
    problem:
      "Exchange dashboards live or die on data freshness. Streaming updates arrive continuously, occasionally out of order or after a reconnect, and the interface still has to stay accurate and readable without overloading the browser.",
    role: "Freelance frontend developer. I built the dashboard components and the streaming data layer.",
    stack: ["React", "TypeScript", "Server-Sent Events", "Zustand", "Axios", "Tailwind CSS", "Vite"],
    caseStudy: {
      overview:
        "A trading dashboard that displays live cryptocurrency prices and supporting market metrics, with chart and analytics components that update continuously as data streams in.",
      problem:
        "A polling dashboard is either stale or expensive. Streaming solves freshness but introduces a different set of problems: reconnects, delayed updates, partial data, and frequent re-renders that make the interface feel heavy exactly when market activity is highest.",
      role: "I built the streaming data layer and the analytics interface: chart components, formatting and loading states, and the state management layer that distributes live updates to the components that need them.",
      solution: [
        "Integrated Server-Sent Events for price and metric streaming, keeping one connection and pushing updates into a central store instead of fetching from each component.",
        "Built reusable chart and analytics components that consume live data with consistent number formatting, empty states, and loading states.",
        "Handled streaming edge cases explicitly: reconnection, delayed updates, and missing data are represented in the UI rather than producing silent gaps.",
        "Reduced render cost by scoping subscriptions so an update re-renders the components that display it.",
      ],
      architecture: {
        summary:
          "A single-page React application with one streaming connection feeding a central store, and presentational analytics components subscribing to the slices they display.",
        client: {
          label: "Interface",
          items: ["Price and metrics dashboards", "Reusable chart components", "Responsive analytics layout"],
        },
        service: {
          label: "Data flow",
          items: [
            "Server-Sent Events connection",
            "Central store for streaming state",
            "Reconnect and staleness handling",
          ],
        },
        data: {
          label: "Client state",
          items: ["Zustand store", "Derived formatting helpers", "Loading and empty states"],
        },
      },
      challenges: [
        {
          title: "Reconnects and delayed updates",
          detail:
            "A dropped stream is normal, not exceptional. The client reconnects and marks data as stale so the interface never presents old prices as current.",
        },
        {
          title: "Render cost under frequent updates",
          detail:
            "Streaming updates arrive constantly. Keeping subscriptions narrow and formatting derived from a single source keeps the dashboard responsive.",
        },
      ],
      decisions: [
        {
          decision: "Server-Sent Events over polling",
          rationale:
            "The data is one-directional and continuous, which is exactly what SSE handles well — one connection, lower overhead than repeated requests.",
        },
        {
          decision: "A single central store for streaming state",
          rationale:
            "With one source of truth, formatting and staleness rules live in one place instead of being reimplemented per component.",
        },
      ],
      outcome: [
        "Delivered a live dashboard where chart and analytics components share one consistent streaming data path.",
        "Documented the streaming failure modes — reconnect, delay, and missing data — as visible interface states rather than silent gaps.",
      ],
      stack: ["React", "TypeScript", "Server-Sent Events", "Zustand", "Axios", "Tailwind CSS", "Vite"],
      disclosure:
        "Client engagement. No public demo or repository link is available, so the interface is described rather than shown.",
      links: [],
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
