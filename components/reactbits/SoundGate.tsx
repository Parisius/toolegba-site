"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSound } from "@/lib/sound/SoundProvider";
import { useDict } from "@/lib/language/LanguageProvider";
import GlowCursor from "./GlowCursor";

/**
 * First-ever-visit question, shown before the greeting screen (and so
 * before anything else): does the visitor want sound for the page-swipe
 * effect? Answering either way marks the visitor as asked, so this never
 * shows again on this browser, and only then does GreetingIntro mount and
 * start its own sequence - see IntroSequence.
 */
export default function SoundGate({ onDone }: { onDone: () => void }) {
  const { enable, disable, markAsked } = useSound();
  const { sound } = useDict();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const choose = (turnOn: boolean) => {
    if (turnOn) enable();
    else disable();
    markAsked();
    onDone();
  };

  return (
    <motion.div
      key="sound-gate"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } }}
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center gap-6 overflow-hidden bg-petrole px-6 text-center"
    >
      {/* Same ambient cursor-glow as the hero (see HeroAmbientGlow) - this
          screen is effectively part of that same opening moment. */}
      <GlowCursor
        trackWindow
        enabled
        color="#E54E3E"
        secondaryColor="#FFAF5C"
        trailLength={44}
        trailWidth={10}
        glowIntensity={2}
        blendMode="screen"
        className="pointer-events-none absolute inset-0"
      />
      <p className="relative max-w-sm font-display text-2xl font-semibold text-white md:text-3xl">
        {sound.question}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => choose(true)}
          className="rounded-full bg-corail px-6 py-2.5 font-sans text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-corail/85"
        >
          {sound.enable}
        </button>
        <button
          type="button"
          onClick={() => choose(false)}
          className="rounded-full border border-white/30 px-6 py-2.5 font-sans text-sm font-semibold uppercase tracking-wide text-white/80 transition-colors hover:border-white hover:text-white"
        >
          {sound.disable}
        </button>
      </div>
    </motion.div>
  );
}
