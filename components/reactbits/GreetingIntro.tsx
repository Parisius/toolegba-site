"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Kept to the site's two supported languages (see LanguageProvider) rather
// than reaching for other regional languages we can't confidently verify.
const GREETINGS = ["Hello", "Bonjour", "Welcome", "Bienvenue"];
const WORD_INTERVAL = 380;
const HOLD_AFTER_LAST = 420;
const EXIT_DURATION = 700;
const LOAD_DURATION = GREETINGS.length * WORD_INTERVAL + HOLD_AFTER_LAST;

export default function GreetingIntro() {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);

  // Returning null below doesn't unmount this component (its parent always
  // renders <GreetingIntro />), so a mount-only effect's cleanup would never
  // run. Drive the lock off `exiting` instead, and belt-and-suspenders
  // restore it on unmount too in case this ever moves under a parent that
  // conditionally renders it.
  useEffect(() => {
    document.body.style.overflow = exiting ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [exiting]);

  useEffect(() => {
    if (index < GREETINGS.length - 1) {
      const t = setTimeout(() => setIndex((i) => i + 1), WORD_INTERVAL);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setExiting(true), WORD_INTERVAL + HOLD_AFTER_LAST);
    return () => clearTimeout(t);
  }, [index]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => setMounted(false), EXIT_DURATION);
    return () => clearTimeout(t);
  }, [exiting]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="greeting-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: EXIT_DURATION / 1000, ease: [0.65, 0, 0.35, 1] },
          }}
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center gap-6 bg-petrole"
        >
          <div className="flex h-14 items-center md:h-20">
          <AnimatePresence mode="wait">
            <motion.span
              key={GREETINGS[index]}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl font-semibold text-white md:text-6xl"
            >
              {GREETINGS[index]}
            </motion.span>
          </AnimatePresence>
          </div>
          <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full w-full origin-left rounded-full bg-corail"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: LOAD_DURATION / 1000, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
