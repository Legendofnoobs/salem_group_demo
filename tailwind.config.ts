import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        apple: {
          bg: "#000000",
          card: "#161617",
          cardHover: "#1d1d1f",
          surface: "#0d0d0e",
          border: "rgba(255, 255, 255, 0.12)",
          text: "#f5f5f7",
          secondary: "#86868b",
          blue: "#2997ff",
          blueHover: "#0071e3",
          green: "#30d158",
          orange: "#ff9f0a",
          purple: "#bf5af2",
          red: "#ff453a",
          titanium: {
            natural: "#9a948c",
            desert: "#c7b198",
            black: "#2d2d2f",
            white: "#ebebeb",
          },
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
