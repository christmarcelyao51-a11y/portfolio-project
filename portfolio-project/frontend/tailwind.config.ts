import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0D1512",
        panel: "#142019",
        panel2: "#1B2921",
        parchment: "#EFE9DA",
        brass: "#C79A45",
        signal: "#3E8E6E",
        cream: "#F5F1E6",
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
        body: ["Arial", "Helvetica Neue", "sans-serif"],
      },
      maxWidth: {
        prose: "72ch",
      },
    },
  },
  plugins: [],
};
export default config;
