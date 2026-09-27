"use client";

import { useIntroOverlay } from "@/lib/intro/IntroOverlayProvider";
import GreetingIntro from "./GreetingIntro";

/**
 * Thin client wrapper so GreetingIntro can report when it's fully cleared
 * (see IntroOverlayProvider) - things like the hero's typed title wait for
 * that real signal instead of a guessed delay.
 */
export default function IntroSequence() {
  const { setOverlayDone } = useIntroOverlay();
  return <GreetingIntro onExited={setOverlayDone} />;
}
