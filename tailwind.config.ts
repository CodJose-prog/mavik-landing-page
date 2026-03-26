import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mavik-bg": "var(--color-bg)",
        "mavik-bg-soft": "var(--color-bg-soft)",
        "mavik-panel": "var(--color-panel)",
        "mavik-panel-strong": "var(--color-panel-strong)",
        "mavik-text": "var(--color-text)",
        "mavik-muted": "var(--color-muted)",
        "mavik-muted-strong": "var(--color-muted-strong)",
        "mavik-line": "var(--color-line)",
        "mavik-copper": "var(--color-accent)",
        "mavik-copper-soft": "var(--color-accent-soft)",
        "mavik-teal": "var(--color-accent-alt)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255, 255, 255, 0.05), 0 30px 80px rgba(0, 0, 0, 0.34)",
        panel: "0 24px 60px rgba(0, 0, 0, 0.26)",
        floating: "0 18px 40px rgba(0, 0, 0, 0.22)",
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(circle at 16% 14%, rgba(123, 103, 255, 0.16), transparent 24%), radial-gradient(circle at 86% 18%, rgba(216, 215, 255, 0.08), transparent 22%), linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 48%)",
      },
    },
  },
  plugins: [],
}

export default config

