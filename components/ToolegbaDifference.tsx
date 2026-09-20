"use client";

import Image from "next/image";
import { useDict } from "@/lib/language/LanguageProvider";
import { indexImages } from "@/lib/content";
import ScrollReveal from "@/components/reactbits/ScrollReveal";

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="5" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.7 7.2 10.5 16M17.3 7.2 13.5 16M7 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 3.5 19 6v5.5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6l7-2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="m9 12 2 2 4-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CARD = "rounded-[28px] bg-petrole overflow-hidden";
const LABEL = "flex items-center gap-2 font-sans text-base font-medium text-white md:text-lg";
const TEXT = "mt-3 font-sans text-sm leading-relaxed text-white/60";

export default function ToolegbaDifference() {
  const { difference } = useDict();
  const { market, team, scoping, impact } = difference.cards;

  return (
    <section className="relative z-[100] bg-ivoire px-6 py-28 md:px-10 md:py-40">
      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-sans text-sm uppercase tracking-wide text-corail">
            {difference.overline}
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-petrole md:text-5xl">
            {difference.headline}
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-petrole/70 md:text-lg">
            {difference.body}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2">
          {/* Large card, spans both rows on the left */}
          <div className={`group ${CARD} flex flex-col p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-petrole/20 md:row-span-2`}>
            <p className={LABEL}>
              <TargetIcon />
              {market.title}
            </p>
            <p className={TEXT}>{market.text}</p>
            <div className="relative mt-8 flex-1 overflow-hidden rounded-2xl">
              <Image
                src={indexImages.difference.market}
                alt=""
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Top-right card */}
          <div className={`group ${CARD} flex flex-col p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-petrole/20`}>
            <div className="relative h-48 overflow-hidden rounded-2xl">
              <Image
                src={indexImages.difference.team}
                alt=""
                fill
                className="object-cover object-[center_11%] transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
            <p className={`${LABEL} mt-6`}>
              <NetworkIcon />
              {team.title}
            </p>
            <p className={TEXT}>{team.text}</p>
          </div>

          {/* Bottom-right card */}
          <div className={`group ${CARD} flex flex-col p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-petrole/20`}>
            <div className="relative h-48 overflow-hidden rounded-2xl">
              <Image
                src={indexImages.difference.scoping}
                alt=""
                fill
                className="object-cover object-[center_8%] transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
            <p className={`${LABEL} mt-6`}>
              <ShieldIcon />
              {scoping.title}
            </p>
            <p className={TEXT}>{scoping.text}</p>
          </div>
        </ScrollReveal>

        {/* Full-width bottom card */}
        <ScrollReveal
          delay={0.2}
          className={`group ${CARD} mt-4 flex flex-col items-start gap-6 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-petrole/20 md:flex-row md:items-center md:gap-10 md:p-10`}
        >
          <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 md:h-32 md:w-32">
            <Image
              src={indexImages.difference.impact}
              alt=""
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
          <div>
            <p className={LABEL}>{impact.title}</p>
            <p className={TEXT}>{impact.text}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
