"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

const ENABLED_KEY = "toolegba-sound-enabled";
const PAGE_TURN_SRC = "/sounds/page-turn.mp3";
const VOLUME = 0.9;

interface SoundContextValue {
  enabled: boolean;
  enable: () => void;
  disable: () => void;
  toggle: () => void;
  playPageTurn: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

/**
 * Sound is off by default and silent about it - no on-load question, just
 * the wavelength button in the header. Turning it on there is itself the
 * user gesture that unlocks playback for the scroll-triggered plays that
 * follow (which aren't gestures themselves).
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      setEnabledState(window.localStorage.getItem(ENABLED_KEY) === "1");
    } catch {
      // localStorage unavailable (private mode, etc.) - fall back to off.
    }
  }, []);

  // Built lazily on a real user gesture (the header toggle) so the
  // browser's autoplay policy never blocks it.
  const getAudio = () => {
    if (typeof window === "undefined") return null;
    if (!audioRef.current) {
      const el = new Audio(PAGE_TURN_SRC);
      el.preload = "auto";
      el.volume = VOLUME;
      audioRef.current = el;
    }
    return audioRef.current;
  };

  const enable = () => {
    setEnabledState(true);
    try {
      window.localStorage.setItem(ENABLED_KEY, "1");
    } catch {
      // Sound still works for this session even if the preference can't be saved.
    }
    // Let it actually play through, right in this click handler: that's both
    // the audible confirmation the sound is on, and the most reliable way to
    // unlock this exact element for the scroll-triggered plays that follow.
    getAudio()?.play().catch(() => {});
  };

  const disable = () => {
    setEnabledState(false);
    try {
      window.localStorage.setItem(ENABLED_KEY, "0");
    } catch {
      // Ignore write failures.
    }
  };

  const toggle = () => (enabled ? disable() : enable());

  const playPageTurn = () => {
    if (!enabled) return;
    const el = getAudio();
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  return (
    <SoundContext.Provider value={{ enabled, enable, disable, toggle, playPageTurn }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return ctx;
}
