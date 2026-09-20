"use client";

import { useState } from "react";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import { useContact } from "@/lib/language/useContent";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`h-4 w-4 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FaqAccordion() {
  const { faq } = useContact();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative z-[100] bg-ivoire px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal className="text-center">
          <p className="mb-4 font-sans text-sm uppercase tracking-wide text-corail">
            {faq.overline}
          </p>
          <h2 className="font-display text-3xl font-semibold text-petrole md:text-4xl">
            {faq.headline}
          </h2>
        </ScrollReveal>

        <div className="mt-12 space-y-3">
          {faq.items.map((item, index) => {
            const open = openIndex === index;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-petrole/10 bg-white/60"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-sans text-sm font-medium text-petrole md:text-base">
                    {item.q}
                  </span>
                  <ChevronIcon open={open} />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 font-sans text-sm leading-relaxed text-petrole/60">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
