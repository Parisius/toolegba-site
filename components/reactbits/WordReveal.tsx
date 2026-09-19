"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Reveals a heading word by word, automatically, the moment it scrolls into
 * view — no hover, no scroll-scrubbing. Pass `key={text}` from the parent
 * if the text can change (e.g. a language switch) so it replays cleanly.
 */
export default function WordReveal({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.15em] align-bottom">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={started ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.07,
            }}
            className="inline-block"
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
