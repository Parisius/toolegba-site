"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Typewriter effect (after reactbits TextType): types the text one character
 * at a time, holds, deletes it, and starts over, with a blinking cursor. The
 * not-yet-typed characters stay in the flow as transparent text, so the line
 * wraps and centres exactly as the finished text will and nothing jumps.
 * Pass `key={text}` from the parent so a language switch retypes cleanly.
 */
export default function TextType({
  text,
  typingSpeed = 75,
  deletingSpeed = 40,
  pauseDuration = 2000,
  startDelay = 0,
  loop = true,
  active = true,
  cursorChar = "_",
  className = "",
}: {
  text: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  startDelay?: number;
  loop?: boolean;
  /** When false the text is cleared and typing waits until it is true again. */
  active?: boolean;
  cursorChar?: string;
  className?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }
    if (!active) {
      setCount(0);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    let n = 0;
    let dir: 1 | -1 = 1;

    const tick = () => {
      if (dir === 1) {
        if (n < text.length) {
          n += 1;
          setCount(n);
          timer = setTimeout(tick, typingSpeed);
        } else if (loop) {
          timer = setTimeout(() => {
            dir = -1;
            tick();
          }, pauseDuration);
        }
      } else if (n > 0) {
        n -= 1;
        setCount(n);
        timer = setTimeout(tick, deletingSpeed);
      } else {
        dir = 1;
        timer = setTimeout(tick, 500);
      }
    };

    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [text, typingSpeed, deletingSpeed, pauseDuration, startDelay, loop, active]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <motion.span
          className="inline-block w-0 overflow-visible"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        >
          {cursorChar}
        </motion.span>
        <span className="opacity-0">{text.slice(count)}</span>
      </span>
    </span>
  );
}
