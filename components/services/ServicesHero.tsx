"use client";

import { motion } from "framer-motion";
import { useServices, useServicesPage } from "@/lib/language/useContent";
import WordReveal from "@/components/reactbits/WordReveal";

export default function ServicesHero() {
  const servicesPage = useServicesPage();
  const services = useServices();

  return (
    <section className="relative z-[100] bg-ivoire px-6 pb-8 pt-40 md:px-10 md:pb-12 md:pt-48">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 font-sans text-sm uppercase tracking-wide text-corail">
          {servicesPage.overline}
        </p>
        <WordReveal
          key={servicesPage.headline}
          as="h1"
          text={servicesPage.headline}
          className="font-display text-4xl font-semibold leading-[1.05] text-petrole md:text-6xl"
        />
        <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-petrole/70 md:text-lg">
          {servicesPage.body}
        </p>

        <nav aria-label={servicesPage.overline} className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {services.map((service, i) => (
            <motion.a
              key={service.id}
              href={`#${service.id}`}
              initial={{ opacity: 0, y: 14, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className="rounded-full border border-petrole/20 bg-white/60 px-4 py-2 font-sans text-sm font-medium text-petrole transition-colors duration-200 hover:border-petrole hover:bg-petrole hover:text-white"
            >
              {service.title}
            </motion.a>
          ))}
        </nav>
      </div>
    </section>
  );
}
