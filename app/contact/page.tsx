import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfoBar from "@/components/contact/ContactInfoBar";
import ContactForm from "@/components/contact/ContactForm";
import ContactMap from "@/components/contact/ContactMap";
import ContactStats from "@/components/contact/ContactStats";
import FaqAccordion from "@/components/contact/FaqAccordion";

export const metadata: Metadata = {
  title: "Contact | Toolègba",
  description:
    "Contactez Toolègba pour discuter de votre prochaine campagne de trade marketing ou de distribution au Bénin et en Afrique de l'Ouest.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactInfoBar />

      <section className="relative z-[100] bg-ivoire px-6 pb-24 md:px-10 md:pb-32">
        <ContactForm />
      </section>

      <section className="relative z-[100] bg-ivoire px-6 pb-24 md:px-10 md:pb-32">
        <ContactMap />
      </section>

      <ContactStats />
      <FaqAccordion />
    </main>
  );
}
