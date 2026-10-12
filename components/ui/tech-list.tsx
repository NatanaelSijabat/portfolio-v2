import { cn } from "@/lib/utils";

export function TechList({
  items,
  className,
  limit,
}: {
  items: readonly string[];
  className?: string;
  limit?: number;
}) {
  const visible = typeof limit === "number" ? items.slice(0, limit) : items;
  const remaining = items.length - visible.length;

  return (
    <ul className={cn("flex flex-wrap gap-x-2 gap-y-1.5", className)}>
      {visible.map((item) => (
        <li
          key={item}
          className="rounded border border-line bg-canvas px-2 py-1 font-mono text-[0.6875rem] leading-none text-subtle"
        >
          {item}
        </li>
      ))}
      {remaining > 0 ? (
        <li className="rounded border border-dashed border-line px-2 py-1 font-mono text-[0.6875rem] leading-none text-subtle">
          +{remaining}
        </li>
      ) : null}
    </ul>
  );
}
