"use client";

import Image from "next/image";
import { useDict } from "@/lib/language/LanguageProvider";
import pictures from "@/content/picture.json";
import ScrollReveal from "@/components/reactbits/ScrollReveal";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function AgenceSpace() {
  const { agencePage, siteInfo } = useDict();
  const { space } = agencePage;

  return (
    <section className="relative z-[100] bg-ivoire px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="max-w-2xl">
          <p className="mb-4 font-sans text-sm uppercase tracking-wide text-corail">
            {space.overline}
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-petrole md:text-5xl">
            {space.headline}
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-petrole/70 md:text-lg">
            {space.body}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="group relative h-64 overflow-hidden rounded-[28px] md:h-80">
            <Image
              src={pictures.agence.space1}
              alt=""
              fill
              className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
          <div className="group relative h-64 overflow-hidden rounded-[28px] md:h-80">
            <Image
              src={pictures.agence.space2}
              alt=""
              fill
              className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
        </ScrollReveal>

        <p className="mt-6 flex items-center gap-2 font-sans text-sm text-petrole/60">
          <PinIcon /> {siteInfo.addressFull}
        </p>
      </div>
    </section>
  );
}
