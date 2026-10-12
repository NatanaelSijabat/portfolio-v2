import { buildCaseStudyMetadata, CaseStudyView } from "@/components/case-study-view";

const slug = "colab-ride";

export const metadata = buildCaseStudyMetadata(slug);

export default function Page() {
  return <CaseStudyView slug={slug} />;
}
