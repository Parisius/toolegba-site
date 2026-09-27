"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSound } from "@/lib/sound/SoundProvider";
import { useIntroOverlay } from "@/lib/intro/IntroOverlayProvider";
import GreetingIntro from "./GreetingIntro";
import SoundGate from "./SoundGate";

/**
 * Orders the two first-load overlays: on a visitor's very first visit, the
 * sound question (SoundGate) shows before anything else, and the branded
 * greeting screen (GreetingIntro) only mounts - and so only starts its own
 * word-cycle - once that's answered. A returning visitor (already asked)
 * skips straight to the greeting, same as before this existed.
 */
export default function IntroSequence() {
  const { ready, asked } = useSound();
  const { setOverlayDone } = useIntroOverlay();
  const [gateAnswered, setGateAnswered] = useState(false);

  // Wait for localStorage to be read so this never flashes the gate for a
  // returning visitor before we know they've already been asked.
  if (!ready) return null;

  const showGate = !asked && !gateAnswered;

  return (
    <>
      <AnimatePresence>{showGate && <SoundGate onDone={() => setGateAnswered(true)} />}</AnimatePresence>
      {!showGate && <GreetingIntro onExited={setOverlayDone} />}
    </>
  );
}
