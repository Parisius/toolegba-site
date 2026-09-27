"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RevealOnView from "./RevealOnView";
import Lightfall from "./reactbits/Lightfall";
import TextType from "./reactbits/TextType";
import HeroServiceCycle from "./HeroServiceCycle";
import { useDict } from "@/lib/language/LanguageProvider";
import { useServices } from "@/lib/language/useContent";
import { indexImages, siteImages } from "@/lib/content";
import { useSound } from "@/lib/sound/SoundProvider";
import { useIntroOverlay } from "@/lib/intro/IntroOverlayProvider";

// Three slides: the intro promise, the self-cycling tour of the six
// services (see HeroServiceCycle), then the brand/CTA close.
const TOTAL_SLIDES = 3;

// Sized from the viewport (title is ~10.5em wide) so it never wraps, not even its colon.
const INTRO_SIZE = "[font-size:min(5.5rem,calc((100vw_-_4.5rem)/11.3))]";

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
  // Gates the hero title's typing on the real "first-load overlays are
  // gone" signal (sound question, then greeting screen) rather than a
  // guessed delay - the sound question's own duration depends on how long
  // the visitor takes to answer it, which a fixed timer can't know.
  const { overlayDone } = useIntroOverlay();
  // The slides are sticky and stack on top of each other, so intersection
  // can't tell which one is showing; derive it from scroll progress instead.
  // Slide i physically covers the screen for the whole scroll range
  // [i, i+1) of slide-heights - floor (not round) matches that exactly, so
  // "active" stays true for a slide's entire visible dwell, not just its
  // first half.
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  // Always call the latest playPageTurn without making the scroll effect
  // below depend on it - that function's identity changes on every
  // SoundProvider render (e.g. toggling sound in the header), which would
  // otherwise tear down and rebuild the listeners below on unrelated clicks.
  const { playPageTurn } = useSound();
  const playPageTurnRef = useRef(playPageTurn);
  useEffect(() => {
    playPageTurnRef.current = playPageTurn;
  });
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const compute = () => {
      if (window.innerHeight === 0) return null;
      const progress = -node.getBoundingClientRect().top / window.innerHeight;
      return Math.min(TOTAL_SLIDES - 1, Math.max(0, Math.floor(progress)));
    };
    // The very first measurement just establishes where we actually are on
    // load (e.g. a mid-page refresh) - it's a baseline, never a "swipe", so
    // it's tracked in a plain closure variable rather than going through the
    // same comparison the real scroll/resize-driven updates below use.
    let current = compute();
    if (current !== null) setActiveSlide(current);
    const update = () => {
      const next = compute();
      if (next === null) return;
      setActiveSlide(next);
      if (current !== null && next !== current) playPageTurnRef.current();
      current = next;
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  const services = useServices().map((service) => ({
    id: service.id,
    word: service.hero.word,
    caption: service.hero.caption,
    image: service.images.hero,
  }));

  // Intro background: the streaking lights by default, or a video when the
  // content is configured with lightfall: false - falls back to the lights
  // if that's set but no video URL is actually given, rather than going blank.
  const intro = indexImages.intro;
  const useLightfall = intro.lightfall !== false || !intro.video;

  return (
    <section ref={sectionRef} id="hero" aria-label="Our expertise" className="relative bg-ivoire">
      <article onClick={advance} className={OUTER} style={{ zIndex: 1 }}>
        <div className={INNER}>
          {useLightfall ? (
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
            <video
              src={intro.video!}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-petrole/90 via-petrole/30 to-petrole/40" />

          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center md:px-10">
            <h2 className={`mx-auto w-full whitespace-nowrap font-display font-semibold leading-[0.95] text-white ${INTRO_SIZE}`}>
              <TextType
                key={hero.intro.word}
                text={hero.intro.word}
                active={activeSlide === 0 && overlayDone}
              />
            </h2>
            <p className="mx-auto mt-6 max-w-lg font-sans text-base text-white/80 md:text-lg">
              {hero.intro.caption}
            </p>
          </div>
        </div>
      </article>

      <article onClick={advance} className={OUTER} style={{ zIndex: 2 }}>
        <div className={INNER}>
          <HeroServiceCycle services={services} active={activeSlide === 1} />
        </div>
      </article>

      <div id="hero-closing-start" aria-hidden="true" className="h-px w-full" />
      {/* Closing slide: content sits at the bottom over a dark scrim so the
          team photo stays clear; the header keeps its own top scrim. */}
      <article
        onClick={advance}
        className={OUTER}
        style={{ zIndex: 3 }}
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
