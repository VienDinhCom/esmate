// @ts-check
import { defineConfig } from "@esmate/prettier";

export default defineConfig({
  astro: true,
  tailwind: {
    tailwindFunctions: ["cn"],
    tailwindStylesheet: "src/assets/styles/global.css",
  },
});
