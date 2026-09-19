import type { Metadata } from "next";
import AgenceHero from "@/components/agence/AgenceHero";
import AgenceValues from "@/components/agence/AgenceValues";
import AgenceServices from "@/components/agence/AgenceServices";
import AgenceSpace from "@/components/agence/AgenceSpace";
import AgenceTeam from "@/components/agence/AgenceTeam";

export const metadata: Metadata = {
  title: "Agence | Toolègba",
  description:
    "Toolègba est un groupe panafricain BTL basé à Cotonou, actif depuis 2014 dans six pays d'Afrique de l'Ouest et Centrale. Découvrez nos valeurs, nos services et notre équipe.",
};

export default function AgencePage() {
  return (
    <main>
      <AgenceHero />
      <AgenceValues />
      <AgenceServices />
      <AgenceSpace />
      <AgenceTeam />
    </main>
  );
}
