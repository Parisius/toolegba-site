"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { REALISATIONS, type RealisationIcon } from "@/components/data/realisations";
import { useDict } from "@/lib/language/LanguageProvider";
import pictures from "@/content/picture.json";
import WordReveal from "@/components/reactbits/WordReveal";

function TradeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M4 9.5 5 4h14l1 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path
        d="M4 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M5.5 9.5V20h13V9.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function OperationnelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M3 7h11v9H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 10h4l3 3v3h-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ConsumerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="8" r="3.3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 20c1-3.8 4-5.8 6.5-5.8s5.5 2 6.5 5.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DistributionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M12 3.5 20 7.5v9L12 20.5 4 16.5v-9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 7.5 12 11.5l8-4M12 11.5V20.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function SocialIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M4 5.5h16v10H12.5L8 19v-3.5H4v-10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8 9.5h8M8 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="m3.5 12 3.2-3.2a2 2 0 0 1 2.9.1l.9.9 3.4-3.4a2 2 0 0 1 2.9 0l3.7 3.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m8 10.5 3.3 3.3a1.6 1.6 0 0 0 2.3 0 1.6 1.6 0 0 0 0-2.3M13 16l1.4 1.4a1.6 1.6 0 0 0 2.3-2.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ICONS: Record<RealisationIcon, React.ReactNode> = {
  trade: <TradeIcon />,
  operationnel: <OperationnelIcon />,
  consumer: <ConsumerIcon />,
  distribution: <DistributionIcon />,
  social: <SocialIcon />,
  rp: <RpIcon />,
};

export default function CaseStudiesGrid() {
  const { realisations } = useDict();

  return (
    <section className="relative z-[100] bg-ivoire px-6 pb-24 md:px-10 md:pb-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        {REALISATIONS.map((r, index) => {
          const text = realisations[r.id as keyof typeof realisations];
          return (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.12 }}
              className="group overflow-hidden rounded-[28px] border border-petrole/10 bg-white/70 transition-shadow duration-300 hover:shadow-2xl hover:shadow-petrole/15"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={pictures.realisations[r.id as keyof typeof pictures.realisations]}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-petrole/50 via-transparent to-transparent" />

                <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md">
                  <span
                    className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-90"
                    style={{ background: r.accent }}
                  />
                  <span
                    className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: r.accent }}
                  />
                  <span className="relative">{ICONS[r.icon]}</span>
                </span>

                <span className="absolute bottom-4 right-4 flex h-10 w-10 scale-75 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100">
                  <span
                    className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: r.accent }}
                  />
                  <span className="relative">
                    <ArrowUpRightIcon />
                  </span>
                </span>
              </div>
              <div className="p-8">
                <p className="text-xs uppercase tracking-wide text-petrole/50">
                  {r.flag} {text.countryLabel} — {text.city}
                </p>
                <WordReveal
                  key={text.title}
                  as="h2"
                  text={text.title}
                  className="mt-2 font-display text-xl font-semibold text-petrole md:text-2xl"
                />
                <p className="mt-3 font-sans text-sm leading-relaxed text-petrole/70">
                  {text.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {text.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-petrole/20 px-3 py-1 text-xs text-petrole/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
