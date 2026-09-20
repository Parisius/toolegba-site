import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyDetail from "@/components/realisations/CaseStudyDetail";
import { REALISATION_IDS, getRealisationContent, isRealisationId } from "@/lib/realisations";

export const dynamicParams = false;

export function generateStaticParams() {
  return REALISATION_IDS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  if (!isRealisationId(params.slug)) return {};
  const content = getRealisationContent(params.slug, "fr");
  return {
    title: `${content.title.replace(/\.$/, "")} | Toolègba`,
    description: content.page.intro,
  };
}

export default function RealisationPage({ params }: { params: { slug: string } }) {
  if (!isRealisationId(params.slug)) notFound();
  return (
    <main>
      <CaseStudyDetail id={params.slug} />
    </main>
  );
}
