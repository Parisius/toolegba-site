"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { useAbout } from "@/lib/language/useContent";

const ITEM_MS = 2000;
const RESUME_MS = 5000;
const EASE = [0.22, 1, 0.36, 1] as const;

// Long service titles get a slightly smaller type size; the rest use the default.
const SERVICE_SIZE: Record<string, string> = {
  operationnel: "text-[clamp(2.25rem,6.5vw,5rem)]",
  consumer: "text-[clamp(2.25rem,6.5vw,5rem)]",
  social: "text-[clamp(2.25rem,6vw,4.5rem)]",
};

export interface CycleService {
  id: string;
  word: string;
  caption: string;
  image: string;
}

/**
 * Second hero slide: cycles through all six services on its own, like a
 * single Instagram-Stories-style beat rather than one full screen per
 * service. Auto-advances every ITEM_MS while this slide is the one in
 * view, pauses on hover/touch, and each segment doubles as a direct link
 * to that service. Only active when `active` is true (the slide the user
 * has actually scrolled to), so it can't advance silently off-screen.
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
  const [hovering, setHovering] = useState(false);
  const pausedUntil = useRef(0);
  const elapsed = useRef(0);
  const lastTime = useRef<number | null>(null);
  const progress = useMotionValue(0);

  const eligible = active && !reduce && !hovering && Boolean(services.length > 1);

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
      setIndex((i) => (i + 1) % services.length);
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

  const current = services[index];

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onPointerDown={onTouch}
      className="relative h-full w-full"
    >
      {/*
        All six images mount at once (opacity-toggled, never unmounted) so
        every one is already fetched and decoded well before its turn comes
        up - swapping via AnimatePresence instead unmounted/remounted the
        <img> on every change, forcing a fresh fetch each time and leaving
        a gray gap while it loaded.
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
            <h2
              className={`mx-auto max-w-4xl font-display font-semibold leading-[0.95] text-white ${
                SERVICE_SIZE[current.id] ?? "text-[clamp(2.75rem,9vw,7rem)]"
              }`}
            >
              {current.word}
            </h2>
            <p className="mx-auto mt-6 max-w-lg font-sans text-base text-white/80 md:text-lg">
              {current.caption}
            </p>
          </motion.div>
        </AnimatePresence>

        <Link
          href="/services"
          onClick={(e) => e.stopPropagation()}
          className="group mt-7 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-white/85 underline decoration-white/40 decoration-2 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
        >
          {page.services.link.replace(/\s*→\s*$/, "")}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>

        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-8 flex w-full max-w-xs items-center gap-1.5 md:max-w-sm"
        >
          {services.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={s.word}
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
      </div>
    </div>
  );
}
