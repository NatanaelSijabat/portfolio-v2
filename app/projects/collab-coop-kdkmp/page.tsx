import { buildCaseStudyMetadata, CaseStudyView } from "@/components/case-study-view";

const slug = "collab-coop-kdkmp";

export const metadata = buildCaseStudyMetadata(slug);

export default function Page() {
  return <CaseStudyView slug={slug} />;
}
