// tailwind.config.js
import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/**/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        caveat: ["Caveat", "cursive"],
        "dm-serif-display": ["DM Serif Display", "serif"],
      },
      colors: {
        // Light mode colors only
        background: "#ffffff",
        surface: "#f3f4f6",
        text: {
          DEFAULT: "#171717",
          muted: "#6b7280",
        },
        border: "#e5e7eb",
      },
      gridColumnStart: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
      },
      gridRowStart: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
      },
    },
  },
  // Remove darkMode configuration
  plugins: [heroui()],
};
