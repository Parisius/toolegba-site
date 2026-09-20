"use client";

import Link from "next/link";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import ServiceIcon from "@/components/icons/ServiceIcon";
import { useAbout, useServices } from "@/lib/language/useContent";

export default function AgenceServices() {
  const { services } = useAbout().page;
  const items = useServices();

  return (
    <section className="relative z-[100] bg-ivoire px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-sans text-sm uppercase tracking-wide text-corail">
            {services.overline}
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-petrole md:text-5xl">
            {services.headline}
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-petrole/70 md:text-lg">
            {services.body}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <div
              key={s.id}
              className="group rounded-2xl border border-petrole/10 bg-white/60 p-7 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-transparent hover:bg-white hover:shadow-2xl hover:shadow-petrole/15"
            >
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-petrole text-white">
                <span
                  className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-90"
                  style={{ background: s.accent }}
                />
                <span
                  className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: s.accent }}
                />
                <span className="relative">
                  <ServiceIcon id={s.id} />
                </span>
              </span>
              <p className="mt-5 font-sans text-base font-semibold text-petrole">{s.title}</p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-petrole/60">{s.text}</p>
            </div>
          ))}
        </ScrollReveal>

        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="group font-sans text-sm font-medium text-petrole underline decoration-corail decoration-2 underline-offset-4 transition-colors hover:text-corail"
          >
            {services.link.replace(/\s*→\s*$/, "")}
            <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
