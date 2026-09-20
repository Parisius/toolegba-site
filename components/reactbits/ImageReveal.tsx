"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Image that is unveiled like a curtain rising as it scrolls into view, then
 * drifts slightly against the scroll (parallax) while it crosses the screen.
 * Put `group` on an ancestor to get the hover zoom.
 *
 * The scroll trigger watches an outer, unclipped wrapper: a fully clipped
 * element is treated as invisible by IntersectionObserver, so it could never
 * trigger its own reveal.
 */
export default function ImageReveal({
  src,
  alt = "",
  sizes,
  className = "",
  radius = 24,
  delay = 0,
  parallax = 8,
  priority = false,
}: {
  src: string;
  alt?: string;
  sizes?: string;
  className?: string;
  radius?: number;
  delay?: number;
  parallax?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);

  const hidden = `inset(100% 0 0 0 round ${radius}px)`;
  const shown = `inset(0% 0 0 0 round ${radius}px)`;
  const show = reduce || inView;

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.4, delay }}
      style={{ borderRadius: radius }}
      className={`relative ${className}`}
    >
      <motion.div
        initial={reduce ? false : { clipPath: hidden }}
        animate={{ clipPath: show ? shown : hidden }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ borderRadius: radius }}
        className="absolute inset-0 overflow-hidden"
      >
        <motion.div style={reduce ? undefined : { y }} className="absolute inset-x-0 -inset-y-[12%]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
