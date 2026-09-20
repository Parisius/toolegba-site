"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RevealOnView from "./RevealOnView";
import Lightfall from "./reactbits/Lightfall";
import TextType from "./reactbits/TextType";
import { useDict } from "@/lib/language/LanguageProvider";
import pictures from "@/content/picture.json";

interface SlideMeta {
  oneLine?: boolean;
  lightfall?: boolean;
  image?: string;
  size?: string;
}

// Per-slide presentation details that aren't translatable text - paired by
// index with the dictionary's hero.slides array.
const SLIDE_META: SlideMeta[] = [
  // Sized from the viewport (title is ~10.5em wide) so it never wraps, not even its colon.
  { lightfall: true, oneLine: true, size: "[font-size:min(5.5rem,calc((100vw_-_4.5rem)/11.3))]" },
  { image: pictures.hero.trade },
  { image: pictures.hero.operationnel, size: "text-[clamp(2.25rem,6.5vw,5rem)]" },
  { image: pictures.hero.consumer, size: "text-[clamp(2.25rem,6.5vw,5rem)]" },
  { image: pictures.hero.rp },
  { image: pictures.hero.distribution },
  { image: pictures.hero.social, size: "text-[clamp(2.25rem,6vw,4.5rem)]" },
];

// The greeting splash only plays on a full page load; wait for it to finish
// before typing on the first visit, but not on later client-side navigations.
let introPlayed = false;

/** Clicking/tapping anywhere on a slide advances to the next one. */
function advance() {
  window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
}

// The sticky article itself stays an untouched, full h-screen box - that
// geometry is exactly what makes the stacking/covering illusion work, so it
// must never be resized or margined. The inset "framed card" look instead
// comes from an absolutely-positioned INNER wrapper, which has zero effect
// on document flow. The gap it leaves on every side (top, sides, AND
// bottom) reveals the <section>'s own bg-ivoire - the same light tone used
// on the footer.
const OUTER = "sticky top-0 h-screen w-full cursor-pointer bg-ivoire";
const INNER = "absolute inset-3 overflow-hidden rounded-[28px] md:inset-4";

export default function HeroStack() {
  const { hero } = useDict();
  // Long delay only for the very first typing; a language switch retypes fast.
  const typeDelay = useRef(introPlayed ? 300 : 2700);
  useEffect(() => {
    const wait = typeDelay.current;
    introPlayed = true;
    const t = setTimeout(() => {
      typeDelay.current = 300;
    }, wait);
    return () => clearTimeout(t);
  }, []);
  // The slides are sticky and stack on top of each other, so intersection
  // can't tell which one is showing; derive it from scroll progress instead.
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const update = () => {
      const node = sectionRef.current;
      if (!node || window.innerHeight === 0) return;
      const progress = -node.getBoundingClientRect().top / window.innerHeight;
      setActiveSlide(Math.max(0, Math.round(progress)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  const slides = hero.slides.map((slide, index) => ({ ...slide, ...SLIDE_META[index] }));

  return (
    <section ref={sectionRef} id="hero" aria-label="Our expertise" className="relative bg-ivoire">
      {slides.map((slide, index) => (
        <article
          key={slide.word}
          onClick={advance}
          className={OUTER}
          style={{ zIndex: index + 1 }}
        >
          <div className={INNER}>
            {slide.lightfall ? (
              <div className="absolute inset-0 bg-petrole">
                <Lightfall
                  className="absolute inset-0"
                  colors={["#2c3d4f", "#E54E3E", "#7F2B2B", "#FFAF5C", "#468F92", "#D11A1B"]}
                  backgroundColor="#5227FF"
                  speed={0.5}
                  streakCount={3}
                  streakWidth={1.1}
                  streakLength={1.2}
                  glow={1.1}
                  backgroundGlow={0.15}
                  mouseInteraction
                  mouseStrength={0.6}
                />
              </div>
            ) : (
              <Image
                src={slide.image!}
                alt=""
                fill
                priority={index === 0}
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-petrole/90 via-petrole/30 to-petrole/40" />

            <div className="relative flex h-full flex-col items-center justify-center px-6 text-center md:px-10">
              {slide.definition && (
                <p className="mb-4 font-sans text-lg tracking-wide text-corail md:text-xl">
                  {slide.definition}
                </p>
              )}
              <h2
                className={`mx-auto font-display font-semibold leading-[0.95] text-white ${
                  slide.oneLine ? "w-full whitespace-nowrap" : "max-w-4xl"
                } ${slide.size ?? "text-[clamp(2.75rem,9vw,7rem)]"}`}
              >
                <TextType
                  key={slide.word}
                  text={slide.word}
                  active={activeSlide === index}
                  startDelay={index === 0 ? typeDelay.current : 300}
                />
              </h2>
              <p className="mx-auto mt-6 max-w-lg font-sans text-base text-white/80 md:text-lg">
                {slide.caption}
              </p>
            </div>
          </div>
        </article>
      ))}
      <div id="slide-7-start" aria-hidden="true" className="h-px w-full" />
      {/* Closing slide: content sits at the bottom over a dark scrim so the
          team photo stays clear; the header keeps its own top scrim. */}
      <article
        onClick={advance}
        className={OUTER}
        style={{ zIndex: slides.length + 1 }}
      >
        <div className={INNER}>
          <Image
            src={pictures.hero.closing}
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-petrole/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-petrole/95 via-petrole/60 to-transparent" />

          <div className="relative flex h-full flex-col items-center justify-end px-6 pb-8 text-center md:px-10 md:pb-10">
            <RevealOnView className="flex flex-col items-center">
              <p className="mb-1 font-sans text-sm text-white/85 md:text-base">{hero.closing.eyebrow}</p>
              <div className="relative aspect-[2000/507] w-[44vw] max-w-[13rem] md:max-w-xs">
                <Image
                  src={pictures.logos.white}
                  alt="Toolègba"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mx-auto mt-2 max-w-lg font-sans text-sm text-white/85 md:text-base">
                {hero.closing.tagline}
              </p>

              <div
                onClick={(e) => e.stopPropagation()}
                className="mt-3 flex flex-wrap items-center justify-center gap-3"
              >
                <Link
                  href="/contact"
                  className="rounded-full bg-corail px-6 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-corail/85"
                >
                  {hero.closing.ctaPrimary}
                </Link>
                <Link
                  href="/realisations"
                  className="rounded-full border border-white/50 px-6 py-2 font-sans text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  {hero.closing.ctaSecondary}
                </Link>
              </div>
            </RevealOnView>
          </div>
        </div>
      </article>
    </section>
  );
}
