"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { siteImages } from "@/lib/content";

const FILL_DURATION = 550; // ms the loading line takes to fill
const HOLD_AFTER_FILL = 120; // ms pause once full before fading out
const EXIT_DURATION = 450; // ms fade-out revealing the new page

/**
 * Branded transition shown between route changes: the logo plus a loading
 * line that fills, then the whole overlay fades to reveal the new page.
 * Skips the very first render (the GreetingIntro already covers that).
 */
export default function PageTransition() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setVisible(true);
    const t = setTimeout(() => setVisible(false), FILL_DURATION + HOLD_AFTER_FILL);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-transition"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: EXIT_DURATION / 1000, ease: [0.65, 0, 0.35, 1] },
          }}
          className="fixed inset-0 z-[400] flex flex-col items-center justify-center gap-5 bg-petrole"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-9 w-9"
          >
            <Image
              src={siteImages.brand.iconCorail}
              alt="Toolègba"
              fill
              priority
              className="object-contain"
            />
          </motion.div>
          <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full w-full origin-left rounded-full bg-corail"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: FILL_DURATION / 1000, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
