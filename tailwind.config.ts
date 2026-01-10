import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "mavik-primary": "#6f2dbd",
        "mavik-secondary": "#a663cc",
        "mavik-dark": "#171123",
        "mavik-light": "#fdfdfd"
      },
      boxShadow: {
        glow: "0 25px 60px -25px rgba(111, 45, 189, 0.45)",
        soft: "0 20px 40px rgba(17, 24, 39, 0.08)"
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at 20% 20%, rgba(111, 45, 189, 0.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(166, 99, 204, 0.18), transparent 35%), linear-gradient(135deg, rgba(111, 45, 189, 0.08), rgba(253, 253, 253, 0.9))"
      }
    }
  },
  plugins: []
};

export default config;

