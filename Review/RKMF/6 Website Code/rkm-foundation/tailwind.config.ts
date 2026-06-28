import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0b",
        snow: "#FAFAFA",
        copper: { DEFAULT: "#c58a4a", dark: "#93502b", light: "#e0b685" },
      },
      fontFamily: { sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"] },
      maxWidth: { content: "72rem" },
    },
  },
  plugins: [],
};
export default config;
