"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

/**
 * Whether every first-load overlay (the sound question, then the greeting
 * screen) has fully cleared. Starts false on every fresh page load and, once
 * true, stays true for the rest of the session (this provider lives at the
 * app root and is never unmounted by client-side navigation) - so things
 * gated on it, like the hero's typed title, wait for the real overlay to be
 * gone on first load, and start immediately on every navigation after that.
 */
interface IntroOverlayContextValue {
  overlayDone: boolean;
  setOverlayDone: () => void;
}

const IntroOverlayContext = createContext<IntroOverlayContextValue | null>(null);

export function IntroOverlayProvider({ children }: { children: ReactNode }) {
  const [overlayDone, setDone] = useState(false);
  return (
    <IntroOverlayContext.Provider value={{ overlayDone, setOverlayDone: () => setDone(true) }}>
      {children}
    </IntroOverlayContext.Provider>
  );
}

export function useIntroOverlay() {
  const ctx = useContext(IntroOverlayContext);
  if (!ctx) {
    throw new Error("useIntroOverlay must be used within an IntroOverlayProvider");
  }
  return ctx;
}
