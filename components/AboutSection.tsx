"use client";

import Link from "next/link";
import TextType from "./TextType";
import ScrollRevealText from "./ScrollRevealText";
import { useDict } from "@/lib/language/LanguageProvider";

export default function AboutSection() {
  const { about } = useDict();

  return (
    <section
      id="agence"
      className="relative z-[100] bg-ivoire px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 font-sans text-sm uppercase tracking-wide text-corail">
          {about.overline}
        </p>

        <h2 className="font-display text-3xl font-semibold leading-tight text-petrole md:text-5xl">
          <TextType text={about.headline} />
        </h2>

        <ScrollRevealText
          text={about.body}
          className="mx-auto mt-8 max-w-2xl font-sans text-lg leading-relaxed text-petrole md:text-xl"
        />

        <Link
          href="/agence"
          className="group mt-8 inline-block border-b-2 border-corail pb-1 font-sans text-sm font-semibold text-petrole transition-colors hover:text-corail"
        >
          {about.link.replace(/\s*→\s*$/, "")}
          <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
