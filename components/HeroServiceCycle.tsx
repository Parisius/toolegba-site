"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useReducedMotion, type MotionValue } from "framer-motion";
import { useAbout } from "@/lib/language/useContent";
import Lightfall from "./reactbits/Lightfall";
import TextType from "./reactbits/TextType";

const ITEM_MS = 2000;
const RESUME_MS = 5000;
// Typing "Nous prenons en main :" takes ~1.7s; the first beat only starts its clock after that.
const TYPING_MS = 1700;
const EASE = [0.22, 1, 0.36, 1] as const;

// Sized from the viewport (title is ~10.5em wide) so the lead-in never wraps, not even its colon.
const LEAD_SIZE = "[font-size:min(3.25rem,calc((100vw_-_4.5rem)/11.3))]";

// Long service titles get a slightly smaller type size; the rest use the default.
const WORD_SIZE: Record<string, string> = {
  operationnel: "text-[clamp(2.25rem,6.5vw,5rem)]",
  consumer: "text-[clamp(2.25rem,6.5vw,5rem)]",
  social: "text-[clamp(2.25rem,6vw,4.5rem)]",
};
const DEFAULT_WORD_SIZE = "text-[clamp(2.75rem,8vw,6.5rem)]";

export interface CycleService {
  id: string;
  word: string;
  caption: string;
  image: string;
}

/**
 * The whole opening act in one slide. "Nous prenons en main :" stays fixed
 * at the top; beneath it the beats change on their own: first the intro
 * (animated light background + the "since 2014" line), then each of the six
 * services over its photo. Auto-advances every ITEM_MS while this slide is the
 * one in view, pauses on hover/touch, and each progress bar doubles as a
 * direct link to that beat.
 */
export default function HeroServiceCycle({
  lead,
  introCaption,
  services,
  active,
  leadDelay,
  exitOpacity,
  exitY,
}: {
  lead: string;
  introCaption: string;
  services: CycleService[];
  active: boolean;
  leadDelay: number;
  /** Scroll-linked fade and lift applied to all text as the closing slide approaches. */
  exitOpacity: MotionValue<number>;
  exitY: MotionValue<number>;
}) {
  const { page } = useAbout();
  const reduce = useReducedMotion();
  // Beat 0 is the intro, beats 1..n are the services.
  const beatCount = services.length + 1;
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const pausedUntil = useRef(0);
  const elapsed = useRef(0);
  const lastTime = useRef<number | null>(null);
  const progress = useMotionValue(0);

  // Don't start the clock until the greeting splash is gone and the lead-in has typed.
  const initialLeadDelay = useRef(leadDelay);
  useEffect(() => {
    pausedUntil.current = Date.now() + initialLeadDelay.current + TYPING_MS;
  }, []);

  const eligible = active && !reduce && !hovering;

  useAnimationFrame((time) => {
    if (!eligible || Date.now() < pausedUntil.current) {
      lastTime.current = null;
      return;
    }
    if (lastTime.current === null) {
      lastTime.current = time;
      return;
    }
    elapsed.current += time - lastTime.current;
    lastTime.current = time;
    if (elapsed.current >= ITEM_MS) {
      elapsed.current = 0;
      progress.set(0);
      setIndex((i) => (i + 1) % beatCount);
    } else {
      progress.set(elapsed.current / ITEM_MS);
    }
  });

  // Give a freshly-arrived-at slide a full beat before it starts advancing.
  useEffect(() => {
    if (active) {
      elapsed.current = 0;
      lastTime.current = null;
      progress.set(0);
    }
  }, [active, progress]);

  const goTo = (i: number) => {
    setIndex(i);
    elapsed.current = 0;
    lastTime.current = null;
    progress.set(0);
    pausedUntil.current = Date.now() + RESUME_MS;
  };

  const onTouch = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") pausedUntil.current = Date.now() + RESUME_MS;
  };

  const service = index > 0 ? services[index - 1] : null;

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onPointerDown={onTouch}
      className="relative h-full w-full"
    >
      {/* Intro background: the streaking lights, only drawing while it is the visible beat. */}
      <motion.div
        animate={{ opacity: index === 0 ? 1 : 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="absolute inset-0 bg-petrole"
      >
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
          paused={index !== 0}
        />
      </motion.div>

      {/*
        All six photos mount at once (opacity-toggled, never unmounted) so every
        one is already fetched and decoded before its turn comes up - swapping
        the src on each change would re-fetch and leave a gray gap.
      */}
      {services.map((s, i) => (
        <motion.div
          key={s.id}
          animate={{ opacity: index === i + 1 ? 1 : 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="absolute inset-0"
        >
          <Image src={s.image} alt="" fill priority={i === 0} className="object-cover" />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-petrole/90 via-petrole/30 to-petrole/40" />

      <motion.div
        style={{ opacity: exitOpacity, y: exitY }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center md:px-10"
      >
        <h2 className={`mx-auto w-full whitespace-nowrap font-display font-semibold leading-[0.95] text-white/90 ${LEAD_SIZE}`}>
          <TextType key={lead} text={lead} loop={false} active={active} startDelay={leadDelay} />
        </h2>

        <div className="mt-5 flex min-h-[15rem] flex-col items-center md:mt-7 md:min-h-[19rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={service ? service.id : "intro"}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {service ? (
                <>
                  <p
                    className={`mx-auto max-w-4xl font-display font-semibold leading-[0.95] text-white ${
                      WORD_SIZE[service.id] ?? DEFAULT_WORD_SIZE
                    }`}
                  >
                    {service.word}
                  </p>
                  <p className="mx-auto mt-6 max-w-lg font-sans text-base text-white/80 md:text-lg">
                    {service.caption}
                  </p>
                </>
              ) : (
                <p className="mx-auto mt-2 max-w-xl font-sans text-lg text-white/85 md:text-2xl">
                  {introCaption}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <Link
          href="/services"
          onClick={(e) => e.stopPropagation()}
          className="group inline-flex items-center gap-1.5 font-sans text-sm font-medium text-white/85 underline decoration-white/40 decoration-2 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
        >
          {page.services.link.replace(/\s*→\s*$/, "")}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>

        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-7 flex w-full max-w-xs items-center gap-1.5 md:max-w-sm"
        >
          {Array.from({ length: beatCount }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={i === 0 ? lead : services[i - 1].word}
              aria-current={i === index}
              className="group/dot relative h-4 flex-1 cursor-pointer"
            >
              <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25 transition-colors group-hover/dot:bg-white/40">
                {i < index && <span className="absolute inset-0 rounded-full bg-white" />}
                {i === index && (
                  <motion.span
                    style={{ scaleX: reduce ? 1 : progress }}
                    className="absolute inset-0 origin-left rounded-full bg-white"
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
