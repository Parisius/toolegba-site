export type RealisationIcon = "consumer" | "trade" | "operationnel" | "distribution" | "social" | "rp";

export interface Realisation {
  id: string; // key into content/realisations.json (text in fr/en, images) and the /realisations/[slug] route
  country: string; // stable (untranslated) key matching MapPin["name"] / MapCountry["name"]
  flag: string;
  icon: RealisationIcon;
  accent: string; // brand hex used for the hover glow + icon badge fill
}

export const REALISATIONS: Realisation[] = [
  { id: "benin", country: "Benin", flag: "🇧🇯", icon: "trade", accent: "#E54E3E" },
  { id: "cotedivoire", country: "Ivory Coast", flag: "🇨🇮", icon: "distribution", accent: "#7F2B2B" },
  { id: "cameroun", country: "Cameroon", flag: "🇨🇲", icon: "consumer", accent: "#468F92" },
  { id: "guinee", country: "Guinea", flag: "🇬🇳", icon: "trade", accent: "#D11A1B" },
  { id: "togo", country: "Togo", flag: "🇹🇬", icon: "trade", accent: "#2C3D4F" },
  { id: "senegal", country: "Senegal", flag: "🇸🇳", icon: "distribution", accent: "#E54E3E" },
];
