import { buildCaseStudyMetadata, CaseStudyView } from "@/components/case-study-view";

const slug = "duitoken-dashboard";

export const metadata = buildCaseStudyMetadata(slug);

export default function Page() {
  return <CaseStudyView slug={slug} />;
}
