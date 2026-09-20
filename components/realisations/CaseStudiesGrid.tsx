"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { REALISATIONS } from "@/components/data/realisations";
import Link from "next/link";
import { useLanguage } from "@/lib/language/LanguageProvider";
import { useRealisationsPage } from "@/lib/language/useContent";
import ServiceIcon from "@/components/icons/ServiceIcon";
import { getRealisationContent, getRealisationImages } from "@/lib/realisations";
import WordReveal from "@/components/reactbits/WordReveal";
import TiltCard from "@/components/reactbits/TiltCard";

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CaseStudiesGrid() {
  const { detail: caseStudy } = useRealisationsPage();
  const { lang } = useLanguage();

  return (
    <section className="relative z-[100] bg-ivoire px-6 pb-24 md:px-10 md:pb-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        {REALISATIONS.map((r, index) => {
          const text = getRealisationContent(r.id, lang);
          return (
            <TiltCard key={r.id} glow={r.accent}>
            <motion.article
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.12 }}
              className="group overflow-hidden rounded-[28px] border border-petrole/10 bg-white/70 transition-shadow duration-300 hover:shadow-2xl hover:shadow-petrole/15"
            >
              <Link href={`/realisations/${r.id}`} className="block">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={getRealisationImages(r.id).cover}
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
                  <span className="relative"><ServiceIcon id={r.icon} className="h-4 w-4" /></span>
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
                  {r.flag} {text.countryLabel}, {text.city}
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
                <p className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold text-petrole transition-colors group-hover:text-corail">
                  {caseStudy.viewCase}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </p>
              </div>
              </Link>
            </motion.article>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
