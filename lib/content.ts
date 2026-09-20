import servicesData from "@/content/services.json";
import aboutData from "@/content/about.json";
import contactData from "@/content/contact.json";
import siteData from "@/content/site.json";
import indexData from "@/content/index.json";

export type ContentLang = "fr" | "en";

/** Every service, flattened for one language: shared fields (id, accent, images) plus that language's text. */
export const getServices = (lang: ContentLang) =>
  servicesData.items.map((item) => ({
    id: item.id,
    accent: item.accent,
    images: item.images,
    ...item[lang],
  }));
export type Service = ReturnType<typeof getServices>[number];

export const getServicesPage = (lang: ContentLang) => servicesData.page[lang];

export const getAbout = (lang: ContentLang) => aboutData[lang];
export const aboutImages = aboutData.images;

export const getContact = (lang: ContentLang) => contactData[lang];
export const contactImages = contactData.images;

/** Logos and favicon icons shared by every page. */
export const siteImages = siteData.images;
/** Images of the home page sections. */
export const indexImages = indexData.images;
