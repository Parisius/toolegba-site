"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useServices, useServicesPage } from "@/lib/language/useContent";
import type { Service } from "@/lib/content";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import ImageReveal from "@/components/reactbits/ImageReveal";
import WordReveal from "@/components/reactbits/WordReveal";

const EASE = [0.22, 1, 0.36, 1] as const;

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ServiceItem({ service, index }: { service: Service; index: number }) {
  const servicesPage = useServicesPage();
  const item = service.page;
  const accent = service.accent;
  const imageFirst = index % 2 === 0;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numberY = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <article
      ref={ref}
      id={service.id}
      className="relative scroll-mt-32 overflow-hidden py-16 md:py-24"
    >
      {/* Giant outlined number drifting behind the text */}
      <motion.span
        aria-hidden="true"
        style={reduce ? undefined : { y: numberY }}
        className={`pointer-events-none absolute top-6 select-none font-display text-[9rem] font-semibold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(44,61,79,0.11)] md:top-10 md:text-[15rem] ${
          imageFirst ? "right-0" : "left-0"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <div className="relative grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className={`group ${imageFirst ? "" : "md:order-2"}`}>
          <ImageReveal
            src={service.images.page}
            alt={service.title}
            sizes="(min-width: 768px) 50vw, 100vw"
            radius={28}
            className="aspect-[4/3] shadow-xl shadow-petrole/15"
          />
        </div>

        <div className={imageFirst ? "" : "md:order-1"}>
          <motion.span
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 font-sans text-sm font-semibold text-white"
            style={{ background: accent }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>

          <WordReveal
            key={service.title}
            as="h2"
            text={service.title}
            className="mt-5 font-display text-3xl font-semibold leading-tight text-petrole md:text-4xl"
          />
          <ScrollReveal delay={0.15} y={18}>
            <p className="mt-4 font-sans text-base leading-relaxed text-petrole/70 md:text-lg">{item.intro}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.25} y={14}>
            <p className="mt-7 font-sans text-xs font-semibold uppercase tracking-wide text-petrole/50">
              {servicesPage.pointsLabel}
            </p>
          </ScrollReveal>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {item.points.map((point, i) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.09, ease: EASE }}
                className="flex items-start gap-2.5 font-sans text-sm leading-snug text-petrole"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.4 + i * 0.09 }}
                  className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-white"
                  style={{ background: accent }}
                >
                  <CheckIcon />
                </motion.span>
                {point}
              </motion.li>
            ))}
          </ul>

          {item.proof && (
            <ScrollReveal x={36} y={0} delay={0.35}>
              <div className="mt-7 rounded-2xl border border-petrole/10 bg-white/70 p-4">
                <p className="font-sans text-xs font-semibold uppercase tracking-wide text-corail">
                  {servicesPage.proofLabel}
                </p>
                <p className="mt-1.5 font-sans text-sm leading-relaxed text-petrole/80">{item.proof}</p>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.45} y={12}>
            <Link
              href="/contact"
              className="group/cta mt-7 inline-flex items-center gap-2 font-sans text-sm font-semibold text-petrole underline decoration-corail decoration-2 underline-offset-4 transition-colors hover:text-corail"
            >
              {servicesPage.cta}
              <span className="transition-transform duration-300 group-hover/cta:translate-x-1.5">→</span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </article>
  );
}

export default function ServicesList() {
  const services = useServices();
  return (
    <section className="relative z-[100] bg-ivoire px-6 pb-8 pt-8 md:px-10 md:pb-16">
      <div className="mx-auto max-w-6xl divide-y divide-petrole/10">
        {services.map((service, index) => (
          <ServiceItem key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
