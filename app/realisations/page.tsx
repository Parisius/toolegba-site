import type { Metadata } from "next";
import CaseStudiesHero from "@/components/realisations/CaseStudiesHero";
import CaseStudiesGrid from "@/components/realisations/CaseStudiesGrid";

export const metadata: Metadata = {
  title: "Réalisations — Toolègba",
  description:
    "Découvrez les campagnes trade marketing et distribution menées par Toolègba pour MTN, Ecobank et d'autres, au Bénin, en Côte d'Ivoire, au Cameroun, en Guinée, au Togo et au Sénégal.",
};

export default function RealisationsPage() {
  return (
    <main>
      <CaseStudiesHero />
      <CaseStudiesGrid />
    </main>
  );
}
