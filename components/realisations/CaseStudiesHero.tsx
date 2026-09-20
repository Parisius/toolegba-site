"use client";

import { useRealisationsPage } from "@/lib/language/useContent";
import WordReveal from "@/components/reactbits/WordReveal";

export default function CaseStudiesHero() {
  const { list: realisationsPage } = useRealisationsPage();

  return (
    <section className="relative z-[100] bg-ivoire px-6 pb-16 pt-40 md:px-10 md:pb-20 md:pt-48">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 font-sans text-sm uppercase tracking-wide text-corail">
          {realisationsPage.overline}
        </p>
        <WordReveal
          key={realisationsPage.headline}
          as="h1"
          text={realisationsPage.headline}
          className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-petrole md:text-6xl"
        />
        <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-petrole/70 md:text-lg">
          {realisationsPage.body}
        </p>
      </div>
    </section>
  );
}
