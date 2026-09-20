"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language/LanguageProvider";
import { useRealisationsPage } from "@/lib/language/useContent";
import {
  REALISATION_IDS,
  getRealisationContent,
  getRealisationImages,
  type RealisationId,
} from "@/lib/realisations";
import { REALISATIONS } from "@/components/data/realisations";
import WordReveal from "@/components/reactbits/WordReveal";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import ScrollExpandImage from "@/components/reactbits/ScrollExpandImage";
import ScrollRevealText from "@/components/ScrollRevealText";
import FadeIn from "@/components/reactbits/FadeIn";
import ImageReveal from "@/components/reactbits/ImageReveal";
import CountUpText from "@/components/reactbits/CountUpText";
import Spotlight from "@/components/reactbits/Spotlight";
import ScrollProgress from "@/components/reactbits/ScrollProgress";

const SECTION = "relative z-[100] bg-ivoire px-6 md:px-10";
const OVERLINE = "font-sans text-sm uppercase tracking-wide text-corail";

export default function CaseStudyDetail({ id }: { id: RealisationId }) {
  const { detail: caseStudy } = useRealisationsPage();
  const { lang } = useLanguage();
  const content = getRealisationContent(id, lang);
  const images = getRealisationImages(id);
  const meta = REALISATIONS.find((r) => r.id === id);
  const { page } = content;

  const index = REALISATION_IDS.indexOf(id);
  const nextId = REALISATION_IDS[(index + 1) % REALISATION_IDS.length];
  const next = getRealisationContent(nextId, lang);
  const nextImages = getRealisationImages(nextId);

  return (
    <>
      <ScrollProgress />

      {/* Hero */}
      <section className={`${SECTION} pb-10 pt-40 md:pb-14 md:pt-48`}>
        <div className="mx-auto max-w-5xl">
          <FadeIn>
          <nav aria-label="Breadcrumb" className="mb-8 font-sans text-sm text-petrole/60">
            <Link href="/realisations" className="transition-colors hover:text-corail">
              {caseStudy.breadcrumbRoot}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-petrole">
              {meta?.flag} {content.countryLabel}
            </span>
          </nav>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className={`mb-4 ${OVERLINE}`}>{content.service}</p>
          </FadeIn>
          <WordReveal
            key={`${lang}-${page.headline}`}
            as="h1"
            text={page.headline}
            className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] text-petrole md:text-6xl"
          />
          <FadeIn delay={0.55}>
            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-petrole/70 md:text-lg">
              {page.intro}
            </p>
          </FadeIn>

          <FadeIn delay={0.7} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-petrole px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-petrole/85"
            >
              {caseStudy.ctaPrimary}
            </Link>
            <Link
              href="/realisations"
              className="rounded-full border border-petrole/30 px-6 py-3 font-sans text-sm font-semibold text-petrole transition-colors hover:border-petrole"
            >
              {caseStudy.ctaSecondary}
            </Link>
          </FadeIn>

          <div className="mt-6 flex flex-wrap gap-2">
            {content.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.9 + i * 0.07 }}
                className="rounded-full border border-petrole/20 px-3 py-1 font-sans text-xs text-petrole/70"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Hero image and key facts */}
      <section className={`${SECTION} pb-16 md:pb-24`}>
        <div className="mx-auto max-w-6xl">
          <ScrollExpandImage
            src={images.hero}
            heightClassName="h-[260px] md:h-[520px]"
            startWidthPercent={78}
          />
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-10 h-px max-w-5xl origin-left bg-petrole/20"
          />
          <dl className="mx-auto mt-8 grid max-w-5xl gap-6 sm:grid-cols-3">
            {page.facts.map((fact, i) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <dt className="font-sans text-xs font-semibold uppercase tracking-wide text-petrole/50">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 font-display text-lg font-semibold text-petrole md:text-xl">
                  {fact.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      {/* Manifesto, revealed word by word on scroll */}
      <section className={`${SECTION} py-16 md:py-28`}>
        <div className="mx-auto max-w-4xl">
          <ScrollRevealText
            key={`${lang}-${id}`}
            text={page.manifesto}
            className="font-display text-2xl font-medium leading-snug text-petrole md:text-4xl"
          />
        </div>
      </section>

      {/* Challenge and approach */}
      <section className={`${SECTION} overflow-x-clip pb-20 md:pb-28`}>
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          {[
            { label: caseStudy.challengeLabel, block: page.challenge },
            { label: caseStudy.approachLabel, block: page.approach },
          ].map(({ label, block }, i) => (
            <ScrollReveal key={label} x={i === 0 ? -50 : 50} y={0} duration={0.9} className="h-full">
            <div className="h-full rounded-[28px] border border-petrole/10 bg-white/70 p-8 md:p-10">
              <p className="font-sans text-xs font-semibold uppercase tracking-wide text-corail">{label}</p>
              <h2 className="mt-4 font-display text-2xl font-semibold leading-snug text-petrole md:text-3xl">
                {block.title}
              </h2>
              <div className="mt-5 space-y-4">
                {block.paragraphs.map((p) => (
                  <p key={p} className="font-sans text-sm leading-relaxed text-petrole/70 md:text-base">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className={`${SECTION} pb-20 md:pb-28`}>
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <p className={`mb-4 ${OVERLINE}`}>{caseStudy.highlightsOverline}</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-petrole md:text-5xl">
              {caseStudy.highlightsHeadline}
            </h2>
          </ScrollReveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.highlights.map((item, i) => (
              <ScrollReveal key={item.title} delay={(i % 3) * 0.12} y={36} className="h-full">
              <div
                className="group h-full rounded-[24px] border border-petrole/10 bg-white/60 p-7 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-transparent hover:bg-white hover:shadow-2xl hover:shadow-petrole/15"
              >
                <p className="font-sans text-xs font-semibold tracking-wide text-corail">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 font-display text-xl font-semibold text-petrole">{item.title}</p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-petrole/60">{item.text}</p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className={`${SECTION} pb-20 md:pb-28`}>
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="max-w-2xl">
            <p className={`mb-4 ${OVERLINE}`}>{caseStudy.galleryOverline}</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-petrole md:text-5xl">
              {caseStudy.galleryHeadline}
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {images.gallery.map((src, i) => (
              <figure key={src} className={`group ${i % 2 === 1 ? "sm:mt-14" : ""}`}>
                <ImageReveal
                  src={src}
                  alt={page.galleryCaptions[i] ?? ""}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/3]"
                  delay={(i % 2) * 0.12}
                />
                {page.galleryCaptions[i] && (
                  <ScrollReveal delay={0.3} y={10}>
                    <figcaption className="mt-3 font-sans text-sm text-petrole/60">
                      {page.galleryCaptions[i]}
                    </figcaption>
                  </ScrollReveal>
                )}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={`${SECTION} pb-20 md:pb-28`}>
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="max-w-2xl">
            <p className={`mb-4 ${OVERLINE}`}>{caseStudy.processOverline}</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-petrole md:text-5xl">
              {caseStudy.processHeadline}
            </h2>
          </ScrollReveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {page.process.map((step, i) => (
              <div key={step.title}>
                <motion.div
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 1 }}
                  transition={{ duration: 0.9, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="h-0.5 origin-left bg-corail"
                />
                <ScrollReveal delay={0.2 + i * 0.18} y={22}>
                  <p className="mt-5 font-sans text-xs font-semibold tracking-wide text-petrole/50">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 font-display text-xl font-semibold text-petrole">{step.title}</p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-petrole/60">{step.text}</p>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className={`${SECTION} pb-20 md:pb-28`}>
        <ScrollReveal className="mx-auto max-w-6xl">
        <Spotlight className="rounded-[28px] bg-petrole px-8 py-14 md:px-16 md:py-20">
          <WordReveal
            key={`${lang}-${page.outcome.title}`}
            as="h2"
            text={page.outcome.title}
            className="max-w-3xl font-display text-3xl font-semibold leading-tight text-white md:text-5xl"
          />
          <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/70 md:text-lg">
            {page.outcome.text}
          </p>
          {page.results.length > 0 && (
            <div className="mt-12 border-t border-white/15 pt-8">
              <p className="font-sans text-xs font-semibold uppercase tracking-wide text-white/50">
                {caseStudy.resultsLabel}
              </p>
              <dl className="mt-6 grid gap-8 sm:grid-cols-3">
                {page.results.map((r) => (
                  <div key={r.label}>
                    <dd className="font-display text-3xl font-semibold text-white md:text-4xl">
                      <CountUpText value={r.value} />
                    </dd>
                    <dt className="mt-2 font-sans text-sm text-white/60">{r.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </Spotlight>
        </ScrollReveal>
      </section>

      {/* Next case study */}
      <section className={`${SECTION} pb-20 md:pb-28`}>
        <ScrollReveal className="mx-auto max-w-6xl">
          <Link
            href={`/realisations/${nextId}`}
            className="group grid overflow-hidden rounded-[28px] border border-petrole/10 bg-white/70 transition-shadow duration-300 hover:shadow-2xl hover:shadow-petrole/15 md:grid-cols-[1fr_1.2fr]"
          >
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className={OVERLINE}>{caseStudy.nextLabel}</p>
              <p className="mt-4 font-display text-2xl font-semibold leading-snug text-petrole md:text-3xl">
                {next.title}
              </p>
              <p className="mt-2 font-sans text-sm text-petrole/60">
                {REALISATIONS.find((r) => r.id === nextId)?.flag} {next.countryLabel}, {next.city}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold text-petrole transition-colors group-hover:text-corail">
                {caseStudy.viewCase}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[280px]">
              <Image
                src={nextImages.cover}
                alt=""
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </Link>
        </ScrollReveal>
      </section>

      {/* Closing call to action */}
      <section className={`${SECTION} pb-24 md:pb-32`}>
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className={`mb-4 ${OVERLINE}`}>{caseStudy.closingOverline}</p>
          <WordReveal
            key={`${lang}-${caseStudy.closingHeadline}`}
            as="h2"
            text={caseStudy.closingHeadline}
            className="font-display text-3xl font-semibold leading-tight text-petrole md:text-5xl"
          />
          <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-petrole/70 md:text-lg">
            {caseStudy.closingBody}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-petrole px-7 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-petrole/85"
            >
              {caseStudy.closingPrimary}
            </Link>
            <Link
              href="/realisations"
              className="rounded-full border border-petrole/30 px-7 py-3 font-sans text-sm font-semibold text-petrole transition-colors hover:border-petrole"
            >
              {caseStudy.closingSecondary}
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
