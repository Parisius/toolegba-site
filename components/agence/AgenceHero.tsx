"use client";

import Link from "next/link";
import { useDict } from "@/lib/language/LanguageProvider";
import pictures from "@/content/picture.json";
import WordReveal from "@/components/reactbits/WordReveal";
import ScrollExpandImage from "@/components/reactbits/ScrollExpandImage";

export default function AgenceHero() {
  const { agencePage } = useDict();
  const { hero } = agencePage;

  return (
    <section className="relative z-[100] bg-ivoire px-6 pb-16 pt-40 md:px-10 md:pb-24 md:pt-48">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 font-sans text-sm uppercase tracking-wide text-corail">
          {hero.overline}
        </p>
        <WordReveal
          key={hero.headline}
          as="h1"
          text={hero.headline}
          className="font-display text-4xl font-semibold leading-[1.05] text-petrole md:text-6xl"
        />
        <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-petrole/70 md:text-lg">
          {hero.body}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-petrole px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-petrole/85"
          >
            {hero.ctaPrimary}
          </Link>
          <Link
            href="/realisations"
            className="rounded-full border border-petrole/30 px-6 py-3 font-sans text-sm font-semibold text-petrole transition-colors hover:border-petrole"
          >
            {hero.ctaSecondary}
          </Link>
        </div>
      </div>

      <ScrollExpandImage src={pictures.agence.hero} className="mt-14 max-w-7xl" />
    </section>
  );
}
