import { Section } from "@/components/section";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section bordered={false} className="py-24">
      <p className="label text-accent">404</p>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink">
        That page does not exist.
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted">
        The link may be outdated, or the case study may have been renamed. The projects index lists
        everything that is currently published.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/projects">Browse projects</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Back home
        </ButtonLink>
      </div>
    </Section>
  );
}
