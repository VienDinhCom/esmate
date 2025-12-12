// @ts-check
import { defineConfig } from "@esmate/prettier";

export default defineConfig({
  astro: true,
  tailwind: {
    tailwindFunctions: ["cn"],
    tailwindStylesheet: "src/frontend/assets/styles/global.css",
  },
  ignores: ["src/frontend/tanstack/config/router/route-tree.gen.ts"],
});
