import { buildCaseStudyMetadata, CaseStudyView } from "@/components/case-study-view";

const slug = "pos-core";

export const metadata = buildCaseStudyMetadata(slug);

export default function Page() {
  return <CaseStudyView slug={slug} />;
}
