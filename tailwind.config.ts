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
        bg: {
          base: "#0b0d13",
          card: "#13161f",
          elevated: "#1a1e2a",
        },
        border: {
          subtle: "rgba(255,255,255,0.08)",
          DEFAULT: "rgba(255,255,255,0.12)",
        },
        text: {
          primary: "#ffffff",
          secondary: "#9ea3b0",
          muted: "#5c6070",
        },
        accent: {
          red: "#e63030",
          orange: "#ff6b35",
          coral: "#f04040",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "gradient-wave": "gradientWave 8s ease infinite",
        "gradient-wave-fast": "gradientWave 5s ease infinite",
        "ticker": "ticker 30s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
      },
      keyframes: {
        gradientWave: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
    },
  },
  plugins: [],
};

export default config;
