"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export default function ScrollRevealText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Reveal starts as soon as the paragraph's top edge enters the viewport
    // and finishes once it's nearly reached the top - spread across a wider
    // scroll distance so the word-by-word effect reads clearly.
    offset: ["start 1", "start 0.1"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}
