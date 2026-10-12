import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  as: Heading = "h2",
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {index || eyebrow ? (
        <div className="label mb-4 flex items-center gap-3 text-subtle">
          {index ? <span className="text-accent">{index}</span> : null}
          {eyebrow ? <span>{eyebrow}</span> : null}
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
        </div>
      ) : null}
      <Heading className="text-2xl font-semibold tracking-tight text-ink sm:text-[2rem] sm:leading-[1.15]">
        {title}
      </Heading>
      {description ? (
        <div className="mt-4 text-base leading-7 text-muted">{description}</div>
      ) : null}
    </div>
  );
}
