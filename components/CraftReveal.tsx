"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import GlowCursor from "./reactbits/GlowCursor";
import { useDict } from "@/lib/language/LanguageProvider";
import pictures from "@/content/picture.json";

export default function CraftReveal() {
  const { craft } = useDict();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Animates as the section travels from just below the viewport to
    // fully pinned at the top.
    offset: ["start end", "start start"],
  });

  // Pause the glow-cursor WebGL loop while this section is off screen,
  // rather than rendering it continuously for the whole page lifetime.
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const blur = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const brightness = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const filter = useTransform(
    [blur, brightness],
    ([b, br]) => `blur(${b}px) brightness(${br})`
  );
  const captionOpacity = useTransform(scrollYProgress, [0.55, 1], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.55, 1], [24, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-petrole"
    >
      <motion.div style={{ scale, filter }} className="absolute inset-0">
        <Image
          src={pictures.craft}
          alt=""
          fill
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-petrole/80 via-transparent to-transparent" />

      <motion.div
        style={{ opacity: captionOpacity, y: captionY }}
        className="absolute inset-x-6 bottom-10 flex flex-col gap-2 md:inset-x-10 md:bottom-14"
      >
        <p className="font-sans text-xs uppercase tracking-wide text-corail md:text-sm">
          {craft.overline}
        </p>
        <p className="max-w-xl font-display text-2xl font-semibold leading-snug text-white md:text-4xl">
          {craft.headline}
        </p>
      </motion.div>

      {/* Cursor glow drawn as its own top layer, over the image/caption above -
          trackWindow + pointer-events-none so it never blocks the content
          underneath while still following the mouse. */}
      <GlowCursor
        trackWindow
        enabled={inView}
        color="#E54E3E"
        secondaryColor="#468F92"
        trailWidth={9}
        glowIntensity={1.7}
        blendMode="screen"
        className="pointer-events-none absolute inset-0 z-10"
      />
    </section>
  );
}
