/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B1F33", // Deep Navy
          light: "#1D5C8C",   // Ocean Blue
        },
        background: "#FFFFFF",
        surface: "#F5F7FA",
        text: {
          main: "#111111",
          secondary: "#6B7280",
        },
        accent: "#FF6A00", // Optional accent from logo
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        "1440": "1440px",
      },
      spacing: {
        "4": "4px",
        "8": "8px",
        "16": "16px",
        "24": "24px",
        "32": "32px",
        "48": "48px",
        "64": "64px",
        "96": "96px",
      },
    },
  },
  plugins: [],
};
