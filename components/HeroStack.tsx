"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import RevealOnView from "./RevealOnView";
import HeroServiceCycle from "./HeroServiceCycle";
import { useDict } from "@/lib/language/LanguageProvider";
import { useServices } from "@/lib/language/useContent";
import { indexImages, siteImages } from "@/lib/content";

// Two macro slides: the self-cycling opening act, then the closing.
const TOTAL_SLIDES = 2;

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
  // Slide i physically covers the screen for the whole scroll range
  // [i, i+1) of slide-heights - floor (not round) matches that exactly, so
  // "active" stays true for a slide's entire visible dwell, not just its
  // first half (round() flips to the next slide at the midpoint, which
  // froze HeroServiceCycle's autoplay for the second half of its screen time).
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  // 0 -> 1 across the scroll from the opening slide to the closing one. The
  // opening slide's text (including "Nous prenons en main :") fades and drifts
  // away over that distance, so it is gone before the closing slide arrives.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  // Plain formula (fully faded from halfway on, and it stays faded) rather than a range map.
  const exitOpacity = useTransform(scrollYProgress, (p) => Math.min(1, Math.max(0, 1 - (p - 0.05) / 0.45)));
  const exitY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  useEffect(() => {
    const update = () => {
      const node = sectionRef.current;
      if (!node || window.innerHeight === 0) return;
      const progress = -node.getBoundingClientRect().top / window.innerHeight;
      setActiveSlide(Math.min(TOTAL_SLIDES - 1, Math.max(0, Math.floor(progress))));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  // Two acts: the opening (intro promise + a self-cycling tour of the six
  // services, see HeroServiceCycle), then the brand/CTA close.
  const services = useServices().map((service) => ({
    id: service.id,
    word: service.hero.word,
    caption: service.hero.caption,
    image: service.images.hero,
  }));

  return (
    <section ref={sectionRef} id="hero" aria-label="Our expertise" className="relative bg-ivoire">
      <article onClick={advance} className={OUTER} style={{ zIndex: 1 }}>
        <div className={INNER}>
          <HeroServiceCycle
            lead={hero.intro.word}
            introCaption={hero.intro.caption}
            services={services}
            active={activeSlide === 0}
            leadDelay={typeDelay.current}
            exitOpacity={exitOpacity}
            exitY={exitY}
          />
        </div>
      </article>

      <div id="hero-closing-start" aria-hidden="true" className="h-px w-full" />
      {/* Closing slide: content sits at the bottom over a dark scrim so the
          team photo stays clear; the header keeps its own top scrim. */}
      <article
        onClick={advance}
        className={OUTER}
        style={{ zIndex: 2 }}
      >
        <div className={INNER}>
          <Image
            src={indexImages.closing}
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
                  src={siteImages.logos.white}
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
