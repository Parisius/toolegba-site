"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Adaptation of reactbits.dev's "Scroll Expand" — the image starts narrower
 * and more rounded, then widens to fill its outer container as it scrolls
 * up through the viewport. Animates actual width (not just a scale
 * transform) so it visibly grows wider, not just zoomed. Purely
 * scroll-position-driven, no pin/sticky.
 */
export default function ScrollExpandImage({
  src,
  className = "",
  heightClassName = "h-[280px] md:h-[460px]",
  startWidthPercent = 55,
}: {
  src: string;
  className?: string;
  heightClassName?: string;
  startWidthPercent?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.25"],
  });

  const width = useTransform(scrollYProgress, [0, 1], [`${startWidthPercent}%`, "100%"]);
  const radius = useTransform(scrollYProgress, [0, 1], [56, 24]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 1]);

  return (
    <div ref={ref} className={`mx-auto w-full ${className}`}>
      <motion.div
        style={{ width, borderRadius: radius, opacity }}
        className={`relative mx-auto overflow-hidden ${heightClassName}`}
      >
        <Image src={src} alt="" fill priority className="object-cover" />
      </motion.div>
    </div>
  );
}
