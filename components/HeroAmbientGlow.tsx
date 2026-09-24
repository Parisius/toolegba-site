"use client";

import { useEffect, useState } from "react";
import GlowCursor from "./reactbits/GlowCursor";

/**
 * Ambient cursor-glow over the hero slide stack. Runs as a fixed,
 * viewport-sized overlay (not a child of the 8-screen-tall sticky stack)
 * so the WebGL canvas stays a single-viewport size regardless of scroll
 * position - matching the marker + scroll-listener pattern BottomBar and
 * Header already use, rather than nesting inside the tall stack itself.
 */
export default function HeroAmbientGlow() {
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    const marker = document.getElementById("hero-closing-start");
    if (!marker) return;

    const update = () => {
      setInHero(marker.getBoundingClientRect().top > 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <GlowCursor
      trackWindow
      enabled={inHero}
      color="#E54E3E"
      secondaryColor="#FFAF5C"
      trailLength={44}
      trailWidth={10}
      glowIntensity={2}
      blendMode="screen"
      className="pointer-events-none fixed inset-0 z-[140]"
    />
  );
}
