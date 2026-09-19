"use client";

import Image from "next/image";
import { useDict } from "@/lib/language/LanguageProvider";
import pictures from "@/content/picture.json";
import ScrollReveal from "@/components/reactbits/ScrollReveal";

const TEAM_PHOTO_KEYS = ["1", "2", "3", "4", "5", "6"] as const;
const TEAM_ACCENTS = ["#E54E3E", "#FFAF5C", "#468F92", "#7F2B2B", "#D11A1B", "#E54E3E"];

export default function AgenceTeam() {
  const { agencePage } = useDict();
  const { team } = agencePage;

  return (
    <section className="relative z-[100] bg-ivoire px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-sans text-sm uppercase tracking-wide text-corail">
            {team.overline}
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-petrole md:text-5xl">
            {team.headline}
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-petrole/70 md:text-lg">
            {team.body}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {team.members.map((member, i) => (
            <div key={member.name} className="group text-center">
              <div
                className="relative mx-auto h-20 w-20 overflow-hidden rounded-full ring-2 ring-transparent transition-all duration-300 group-hover:ring-[var(--accent)] group-hover:ring-offset-2 group-hover:ring-offset-ivoire md:h-24 md:w-24"
                style={{ ["--accent" as string]: TEAM_ACCENTS[i] }}
              >
                <Image
                  src={pictures.agence.team[TEAM_PHOTO_KEYS[i]]}
                  alt=""
                  fill
                  className="object-cover grayscale transition-all duration-500 ease-out group-hover:scale-110 group-hover:grayscale-0"
                />
              </div>
              <p className="mt-4 font-sans text-sm font-semibold text-petrole">
                {member.name}
              </p>
              <p className="mt-0.5 font-sans text-xs text-petrole/60">
                {member.role}
              </p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
