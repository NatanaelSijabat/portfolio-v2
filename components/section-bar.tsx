import type { ReactNode } from "react";

/**
 * Section header used across the site: a serif title on the left, and either a short
 * count or a link on the right, sitting on a hairline. Deliberately not a card.
 */
export function SectionBar({
  title,
  meta,
  action,
  id,
}: {
  title: string;
  meta?: string;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-3">
      <h2
        id={id}
        className="text-[1.4rem] font-normal leading-snug tracking-tight text-ink sm:text-[1.5rem]"
      >
        {title}
      </h2>
      {action ?? (meta ? <p className="label text-subtle">{meta}</p> : null)}
    </div>
  );
}
