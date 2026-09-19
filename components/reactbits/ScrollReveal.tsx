"use client";

import { motion, type Transition } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Generic fade + slide-up entrance, triggered once when the element scrolls
 * into view. Thin wrapper around framer-motion's whileInView so section
 * headings/grids across the site don't each hand-roll the same transition.
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  duration = 0.7,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}) {
  const transition: Transition = { duration, delay, ease: [0.22, 1, 0.36, 1] };

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
