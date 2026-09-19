"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useDict } from "@/lib/language/LanguageProvider";
import pictures from "@/content/picture.json";
import ScrollReveal from "@/components/reactbits/ScrollReveal";

const INDUSTRY_KEYS = ["telecom", "banque", "transfert", "assurance", "agro"] as const;

// Cards are landscape like the photos; only the subject offset differs.
const OBJECT_POSITION: Record<(typeof INDUSTRY_KEYS)[number], string> = {
  telecom: "70% center",
  banque: "40% center",
  transfert: "center 30%",
  assurance: "center",
  agro: "center",
};

const CENTER = Math.floor(INDUSTRY_KEYS.length / 2);
const SPRING = { type: "spring" as const, stiffness: 260, damping: 24 };

export default function IndustriesSection() {
  const { industries } = useDict();
  const [active, setActive] = useState(CENTER);

  return (
    <section className="relative z-[100] overflow-hidden bg-ivoire px-6 py-28 md:px-10 md:py-40">
      <ScrollReveal className="mx-auto max-w-3xl text-center">
        <p className="mb-4 font-sans text-sm uppercase tracking-wide text-corail">
          {industries.overline}
        </p>
        <h2 className="font-display text-3xl font-semibold leading-tight text-petrole md:text-5xl">
          {industries.headline}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-petrole/70 md:text-lg">
          {industries.body}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.15} className="relative mx-auto mt-20 h-[220px] max-w-4xl md:h-[290px]">
       <div
        className="absolute inset-0"
        onMouseLeave={() => setActive(CENTER)}
       >
        {INDUSTRY_KEYS.map((key, index) => {
          const name = industries.items[key];
          const offset = index - CENTER;
          const isActive = active === index;
          const rotate = offset * 9;
          const translateX = offset * 92;
          const translateY = Math.abs(offset) * 24 - (isActive ? 24 : 0);
          const scale = isActive ? 1.1 : 0.92;

          return (
            <motion.button
              key={key}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              aria-label={name}
              className="absolute left-1/2 top-0 h-[120px] w-[180px] origin-bottom cursor-pointer md:h-[170px] md:w-[260px]"
              animate={{
                x: `calc(-50% + ${translateX}px)`,
                y: translateY,
                rotate,
                scale,
              }}
              transition={SPRING}
              style={{ zIndex: isActive ? 50 : 10 - Math.abs(offset) }}
            >
              <div
                className="relative h-full w-full overflow-hidden rounded-[20px] border border-white/40 bg-petrole shadow-xl transition-shadow duration-300"
                style={{
                  boxShadow: isActive
                    ? "0 32px 60px -20px rgba(44,61,79,0.45)"
                    : "0 18px 30px -18px rgba(44,61,79,0.35)",
                }}
              >
                <Image
                  src={pictures.industries[key]}
                  alt=""
                  fill
                  className="object-cover transition-[filter] duration-300 ease-out"
                  style={{
                    objectPosition: OBJECT_POSITION[key],
                    filter: isActive
                      ? "grayscale(0) saturate(1) brightness(1)"
                      : "grayscale(0.65) saturate(0.7) brightness(0.75)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-petrole/90 via-petrole/10 to-transparent" />
                <p
                  className="absolute inset-x-3 bottom-3 text-left font-sans text-xs font-semibold leading-snug md:text-sm text-white transition-opacity duration-300"
                  style={{ opacity: isActive ? 1 : 0.55 }}
                >
                  {name}
                </p>
              </div>
            </motion.button>
          );
        })}
       </div>
      </ScrollReveal>

      <div className="mt-14 text-center">
        <Link
          href="/contact"
          className="font-sans text-sm font-medium text-petrole underline decoration-corail decoration-2 underline-offset-4 transition-colors hover:text-corail"
        >
          {industries.link}
        </Link>
      </div>
    </section>
  );
}
