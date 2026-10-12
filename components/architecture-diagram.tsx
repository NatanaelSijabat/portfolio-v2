import { ArrowDown } from "lucide-react";

import type { CaseStudy } from "@/data/types";

function Layer({
  layer,
  index,
}: {
  layer: CaseStudy["architecture"]["client"];
  index: number;
}) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="label text-accent">{layer.label}</p>
        <span className="font-mono text-[0.625rem] text-subtle">L{index}</span>
      </div>
      <ul className="mt-4 space-y-2">
        {layer.items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-6 text-muted">
            <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-line-strong" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ArchitectureDiagram({ architecture }: { architecture: CaseStudy["architecture"] }) {
  const layers = [architecture.client, architecture.service, architecture.data];

  return (
    <figure className="mt-8">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
        <Layer layer={layers[0]!} index={1} />
        <div aria-hidden="true" className="flex items-center justify-center text-line-strong">
          <ArrowDown className="size-4 md:hidden" />
          <span className="hidden font-mono text-xs md:block">→</span>
        </div>
        <Layer layer={layers[1]!} index={2} />
        <div aria-hidden="true" className="flex items-center justify-center text-line-strong">
          <ArrowDown className="size-4 md:hidden" />
          <span className="hidden font-mono text-xs md:block">→</span>
        </div>
        <Layer layer={layers[2]!} index={3} />
      </div>

      {architecture.integrations && architecture.integrations.length > 0 ? (
        <div className="mt-3 rounded-lg border border-dashed border-line-strong p-5">
          <p className="label text-subtle">External services</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {architecture.integrations.map((item) => (
              <li key={item} className="text-sm text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <figcaption className="mt-4 text-xs leading-5 text-subtle">{architecture.summary}</figcaption>
    </figure>
  );
}
