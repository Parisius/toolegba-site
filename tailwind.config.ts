import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Toolègba brand tokens - from the official charte graphique
        petrole: "#2C3D4F", // bleu pétrole - primary dark
        corail: "#E54E3E", // rouge corail - primary accent
        bordeaux: "#7F2B2B",
        orange: "#FFAF5C", // or orangé
        rougevif: "#D11A1B",
        sarcelle: "#468F92", // bleu sarcelle
        ivoire: "#FBF3E7",
      },
      fontFamily: {
        display: ["var(--font-league-spartan)", "sans-serif"],
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      keyframes: {
        "scroll-dot": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "translateY(14px)", opacity: "0" },
        },
      },
      animation: {
        "scroll-dot": "scroll-dot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
