import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import ServicesClosing from "@/components/services/ServicesClosing";

export const metadata: Metadata = {
  title: "Services | Toolègba",
  description:
    "Trade marketing, marketing opérationnel, services consumer, relations publiques, distribution et réseaux sociaux : les six services de Toolègba pour vendre et rendre votre marque visible en Afrique.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesList />
      <ServicesClosing />
    </main>
  );
}
