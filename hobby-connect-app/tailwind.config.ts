import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F1EDE1",
        paperDeep: "#E6E0CE",
        ink: "#24211B",
        inkSoft: "#6E6858",
        pine: "#33502E",
        pineDeep: "#223A20",
      },
    },
  },
  plugins: [],
};

export default config;
