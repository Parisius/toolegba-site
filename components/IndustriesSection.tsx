"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useDict } from "@/lib/language/LanguageProvider";
import { indexImages } from "@/lib/content";
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

const AUTOPLAY_MS = 3200;
const RESUME_MS = 6000;

/** Mobile version of the fan: cards slide right to left on their own, and can be swiped or stepped with the arrows. */
function IndustryCarousel() {
  const { industries } = useDict();
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedUntil = useRef(0);
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i: number) => {
    const el = trackRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  }, []);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement;
      const dist = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setIndex(best);
  };

  const pause = () => {
    pausedUntil.current = Date.now() + RESUME_MS;
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      const el = trackRef.current;
      if (!el || Date.now() < pausedUntil.current) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      goTo((index + 1) % INDUSTRY_KEYS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [index, goTo]);

  const step = (dir: 1 | -1) => {
    pause();
    goTo((index + dir + INDUSTRY_KEYS.length) % INDUSTRY_KEYS.length);
  };

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onTouchStart={pause}
        onPointerDown={pause}
        className="relative -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[11vw] pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {INDUSTRY_KEYS.map((key) => (
          <div
            key={key}
            className="relative aspect-[3/2] w-[78vw] max-w-[340px] flex-none snap-center overflow-hidden rounded-[22px] border border-white/40 bg-petrole shadow-xl shadow-petrole/25"
          >
            <Image
              src={indexImages.industries[key]}
              alt=""
              fill
              sizes="80vw"
              className="object-cover"
              style={{ objectPosition: OBJECT_POSITION[key] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-petrole/90 via-petrole/10 to-transparent" />
            <p className="absolute inset-x-4 bottom-4 text-left font-sans text-base font-semibold leading-snug text-white">
              {industries.items[key]}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-petrole shadow-md shadow-petrole/10"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path d="M19 12H5m0 0 6-6m-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex gap-2" aria-hidden="true">
          {INDUSTRY_KEYS.map((key, i) => (
            <span
              key={key}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-5 bg-corail" : "w-1.5 bg-petrole/25"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-petrole shadow-md shadow-petrole/10"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

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

      <ScrollReveal delay={0.15} className="mt-12 md:hidden">
        <IndustryCarousel />
      </ScrollReveal>

      <ScrollReveal delay={0.15} className="relative mx-auto mt-20 hidden h-[290px] max-w-4xl md:block">
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
                  src={indexImages.industries[key]}
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
