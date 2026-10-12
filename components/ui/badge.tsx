import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "accent";
}) {
  return (
    <span
      className={cn(
        "label inline-flex items-center rounded-full border px-2.5 py-1",
        tone === "accent"
          ? "border-accent/40 bg-accent-soft text-accent"
          : "border-line text-subtle",
        className,
      )}
    >
      {children}
    </span>
  );
}
