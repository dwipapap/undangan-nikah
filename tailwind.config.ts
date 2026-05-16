import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#383f54",
        "midnight-slate": "#383f54",
        cream: "#fdfbf2",
        "warm-parchment": "#fdfbf2",
        ivory: "#FAF7EE",
        "soft-ivory": "#FAF7EE",
        charcoal: "#2C2C2C",
        rose: "#F5E6E0",
        "rose-dust": "#F5E6E0",
        muted: "#8B7E74",
        "muted-earth": "#8B7E74",
        "script-gold": "#d4af37",
        "deep-navy": "#2c3746",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        script: ["var(--font-great-vibes)", "cursive"],
        body: ["var(--font-poppins)", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
