import data from "@/content/realisations.json";

const items = data.items;

export type RealisationId = keyof typeof items;
export type RealisationLang = "fr" | "en";

export interface RealisationContent {
  countryLabel: string;
  city: string;
  title: string;
  service: string;
  description: string;
  tags: string[];
  page: {
    headline: string;
    intro: string;
    facts: { label: string; value: string }[];
    manifesto: string;
    challenge: { title: string; paragraphs: string[] };
    approach: { title: string; paragraphs: string[] };
    highlights: { title: string; text: string }[];
    galleryCaptions: string[];
    process: { title: string; text: string }[];
    outcome: { title: string; text: string };
    results: { value: string; label: string }[];
  };
}

export interface RealisationImages {
  cover: string;
  hero: string;
  gallery: string[];
}

export const REALISATION_IDS = Object.keys(items) as RealisationId[];

export const isRealisationId = (value: string): value is RealisationId =>
  (REALISATION_IDS as string[]).includes(value);

export const getRealisationImages = (id: string): RealisationImages =>
  items[id as RealisationId].images;

export const getRealisationContent = (id: string, lang: RealisationLang): RealisationContent =>
  items[id as RealisationId][lang] as RealisationContent;

/** Text of the global Réalisations pages: list page, home section and the labels of the detail page. */
export const getRealisationsPage = (lang: RealisationLang) => data.page[lang];
