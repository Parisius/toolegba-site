"use client";

import { useEffect, useState } from "react";
import { useDict } from "@/lib/language/LanguageProvider";

export default function BottomBar() {
  const { bottomBar, siteInfo } = useDict();
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    // A 1px marker placed right at the start of the closing slide -
    // as soon as it's scrolled past, contact info + scroll indicator hide.
    // A direct scroll listener (rather than IntersectionObserver) avoids
    // any frame-skipping edge cases with fast/instant scroll jumps.
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
    <>
      {/* Contact info - pinned low, left. Hidden once the closing slide starts. */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-5 z-[150] flex justify-start px-6 md:bottom-6 md:px-10 ${
          inHero ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="pointer-events-auto font-sans text-xs leading-relaxed text-white/85 md:text-sm">
          <p>{siteInfo.email}</p>
          <p>
            {siteInfo.phone} · {siteInfo.phoneCI}
          </p>
          <p className="text-white/60">{siteInfo.addressShort}</p>
        </div>
      </div>

      {/* Scroll indicator - label above the animation. Hidden once the closing slide starts. */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-20 z-[150] flex justify-center md:bottom-24 ${
          inHero ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="pointer-events-auto flex flex-col items-center gap-2">
          <span className="font-sans text-[11px] uppercase tracking-wide text-white/70 md:text-xs">
            {bottomBar.scrollToExplore}
          </span>
          <span
            className="flex h-9 w-6 items-start justify-center rounded-full border border-white/40 pt-2"
            role="img"
            aria-label="Scroll to explore"
          >
            <span className="h-1.5 w-1.5 animate-scroll-dot rounded-full bg-corail" />
          </span>
        </div>
      </div>
    </>
  );
}