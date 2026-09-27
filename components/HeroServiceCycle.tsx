"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useAnimationFrame, useReducedMotion } from "framer-motion";
import { useAbout } from "@/lib/language/useContent";

const ITEM_MS = 3200;
const RESUME_MS = 5000;
const EASE = [0.22, 1, 0.36, 1] as const;

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
 * Cycles through all six services on its own: image, title and caption
 * crossfade together every ITEM_MS while this slide is the one in view.
 * Runs continuously regardless of the pointer - hovering does not pause it,
 * only clicking a bar does (briefly, so the pick sticks before it resumes).
 */
export default function HeroServiceCycle({
  services,
  active,
}: {
  services: CycleService[];
  active: boolean;
}) {
  const { page } = useAbout();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const pausedUntil = useRef(0);
  const elapsed = useRef(0);
  const lastTime = useRef<number | null>(null);

  const eligible = active && !reduce;

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
      setIndex((i) => (i + 1) % services.length);
    }
  });

  // Give a freshly-arrived-at slide a full beat before it starts advancing.
  useEffect(() => {
    if (active) {
      elapsed.current = 0;
      lastTime.current = null;
    }
  }, [active]);

  const goTo = (i: number) => {
    setIndex(i);
    elapsed.current = 0;
    lastTime.current = null;
    pausedUntil.current = Date.now() + RESUME_MS;
  };

  // No hover-pause: touch still gets a brief pause after a tap, since there's
  // no hover state on touch devices to hold it in place otherwise.
  const onTouch = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") pausedUntil.current = Date.now() + RESUME_MS;
  };

  const current = services[index];

  return (
    <div onPointerDown={onTouch} className="relative h-full w-full">
      {/*
        All six photos mount at once (opacity-toggled, never unmounted) so every
        one is already fetched and decoded before its turn comes up - swapping
        the src on each change would re-fetch and leave a gray gap.
      */}
      {services.map((s, i) => (
        <motion.div
          key={s.id}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="absolute inset-0"
        >
          <Image src={s.image} alt="" fill priority={i === 0} className="object-cover" />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-petrole/90 via-petrole/30 to-petrole/40" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center md:px-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <p
              className={`mx-auto max-w-4xl font-display font-semibold leading-[0.95] text-white ${
                WORD_SIZE[current.id] ?? DEFAULT_WORD_SIZE
              }`}
            >
              {current.word}
            </p>
            <p className="mx-auto mt-3 max-w-lg font-sans text-base text-white/80 md:text-lg">
              {current.caption}
            </p>
          </motion.div>
        </AnimatePresence>

        <Link
          href="/services"
          onClick={(e) => e.stopPropagation()}
          className="group mt-5 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-white/85 underline decoration-white/40 decoration-2 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
        >
          {page.services.link.replace(/\s*→\s*$/, "")}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>

        <div onClick={(e) => e.stopPropagation()} className="mt-5 flex items-center">
          {services.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={s.word}
              aria-current={i === index}
              // The dot itself is small and round; the button padding is what
              // gives it a touch-friendly ~44px tap target without making the
              // indicator itself look oversized.
              className="group/dot flex h-11 w-11 cursor-pointer items-center justify-center"
            >
              <span
                className={`rounded-full transition-all duration-300 group-hover/dot:bg-white/70 ${
                  i === index ? "h-2.5 w-2.5 bg-white" : "h-1.5 w-1.5 bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
