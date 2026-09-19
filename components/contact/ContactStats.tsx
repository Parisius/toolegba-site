"use client";

import { useDict } from "@/lib/language/LanguageProvider";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import CountUp from "@/components/reactbits/CountUp";

export default function ContactStats() {
  const { contactPage } = useDict();

  return (
    <section className="relative z-[100] bg-ivoire px-6 py-20 md:px-10">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 text-center sm:grid-cols-3">
        {contactPage.stats.map((s, i) => (
          <ScrollReveal key={s.label} delay={i * 0.1}>
            <CountUp
              value={s.value}
              className="font-display text-3xl font-semibold text-corail md:text-4xl"
            />
            <p className="mt-2 font-sans text-sm text-petrole/60">{s.label}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
