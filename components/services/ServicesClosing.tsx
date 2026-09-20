"use client";

import Link from "next/link";
import { useServicesPage } from "@/lib/language/useContent";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import Spotlight from "@/components/reactbits/Spotlight";
import WordReveal from "@/components/reactbits/WordReveal";

export default function ServicesClosing() {
  const { closing } = useServicesPage();

  return (
    <section className="relative z-[100] bg-ivoire px-6 pb-24 md:px-10 md:pb-32">
      <ScrollReveal className="mx-auto max-w-4xl">
       <Spotlight className="rounded-[28px] bg-petrole px-8 py-14 text-center md:px-16 md:py-20">
        <WordReveal
          key={closing.headline}
          as="h2"
          text={closing.headline}
          className="font-display text-3xl font-semibold leading-tight text-white md:text-5xl"
        />
        <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-white/70 md:text-lg">
          {closing.body}
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full bg-corail px-8 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-corail/85"
        >
          {closing.button}
        </Link>
       </Spotlight>
      </ScrollReveal>
    </section>
  );
}
