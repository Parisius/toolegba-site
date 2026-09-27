"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

const ENABLED_KEY = "toolegba-sound-enabled";
const ASKED_KEY = "toolegba-sound-asked";
const PAGE_TURN_SRC = "/sounds/page-turn.mp3";
const VOLUME = 0.9;

interface SoundContextValue {
  /** Whether storage has been read yet - the sound prompt waits for this before deciding to show. */
  ready: boolean;
  enabled: boolean;
  /** Whether the user has already been asked once (this browser, ever). */
  asked: boolean;
  enable: () => void;
  disable: () => void;
  toggle: () => void;
  markAsked: () => void;
  playPageTurn: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [enabled, setEnabledState] = useState(false);
  const [asked, setAskedState] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      setEnabledState(window.localStorage.getItem(ENABLED_KEY) === "1");
      setAskedState(window.localStorage.getItem(ASKED_KEY) === "1");
    } catch {
      // localStorage unavailable (private mode, etc.) - fall back to defaults.
    }
    setReady(true);
  }, []);

  // Built lazily on a real user gesture (the sound question's own button, or
  // the header toggle) so the browser's autoplay policy never blocks it.
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
    // unlock this exact element for the scroll-triggered plays that follow
    // (which aren't gestures themselves). A previous version tried to
    // silently play-then-pause several pooled elements at once, resetting
    // currentTime before the play promise had even resolved - that could
    // abort the unlock it was trying to establish, and not every element in
    // the pool reliably got unlocked, which is why turning sound on could
    // take several clicks before a swipe was actually audible.
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

  const markAsked = () => {
    setAskedState(true);
    try {
      window.localStorage.setItem(ASKED_KEY, "1");
    } catch {
      // Ignore write failures - worst case the prompt asks again next visit.
    }
  };

  const playPageTurn = () => {
    if (!enabled) return;
    const el = getAudio();
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  return (
    <SoundContext.Provider value={{ ready, enabled, asked, enable, disable, toggle, markAsked, playPageTurn }}>
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
