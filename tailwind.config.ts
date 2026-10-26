import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        primaryLight: "var(--primary-light)",
        primaryDark: "var(--primary-dark)",
        muted: "var(--muted)",
        card: "var(--card)",
        border: "var(--border)",
        indigo: "var(--indigo)",
        pink: "var(--pink)",
      },
    },
  },
  plugins: [require("tailwind-merge")],
};

export default config;