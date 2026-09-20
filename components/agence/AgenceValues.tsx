"use client";

import ScrollReveal from "@/components/reactbits/ScrollReveal";
import { useAbout } from "@/lib/language/useContent";

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m14.8 9.2-1.4 4-4 1.4 1.4-4 4-1.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4 20V10M11 20V4M18 20v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m8.2 12.3 2.6 2.6 5-5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const VALUE_ICONS = [<CompassIcon key="compass" />, <ChartIcon key="chart" />, <CheckIcon key="check" />];

// Cycled across the value cards so each icon "lights up" in a different
// brand color on hover, rather than one flat accent for all.
const VALUE_ACCENTS = ["#E54E3E", "#468F92", "#D11A1B"];

export default function AgenceValues() {
  const { values } = useAbout().page;

  return (
    <section className="relative z-[100] bg-ivoire px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-sans text-sm uppercase tracking-wide text-corail">
            {values.overline}
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-petrole md:text-5xl">
            {values.headline}
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-petrole/70 md:text-lg">
            {values.body}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {values.items.map((item, i) => (
            <div
              key={item.title}
              className="group rounded-[28px] bg-petrole p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-petrole/40"
            >
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 group-hover:border-transparent">
                <span
                  className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-90"
                  style={{ background: VALUE_ACCENTS[i] }}
                />
                <span
                  className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: VALUE_ACCENTS[i] }}
                />
                <span className="relative">{VALUE_ICONS[i]}</span>
              </span>
              <p className="mt-5 font-sans text-base font-medium text-white">
                {item.title}
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-white/60">
                {item.text}
              </p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
