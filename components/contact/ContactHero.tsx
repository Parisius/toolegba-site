"use client";

import Image from "next/image";
import { useDict } from "@/lib/language/LanguageProvider";
import pictures from "@/content/picture.json";
import WordReveal from "@/components/reactbits/WordReveal";

export default function ContactHero() {
  const { contactPage } = useDict();
  const { hero } = contactPage;

  return (
    <section className="relative z-[100] bg-ivoire px-6 pb-16 pt-40 md:px-10 md:pb-20 md:pt-48">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 font-sans text-sm uppercase tracking-wide text-corail">
          {hero.overline}
        </p>
        <WordReveal
          key={hero.headline}
          as="h1"
          text={hero.headline}
          className="font-display text-4xl font-semibold leading-[1.05] text-petrole md:text-6xl"
        />
        <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-petrole/70 md:text-lg">
          {hero.body}
        </p>
      </div>

      <div className="relative mx-auto mt-14 h-[220px] w-full max-w-5xl overflow-hidden rounded-[28px] md:h-[340px]">
        <Image
          src={pictures.contact.hero}
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
}
