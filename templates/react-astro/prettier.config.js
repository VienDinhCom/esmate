// @ts-check
import { defineConfig } from "@esmate/prettier";

export default defineConfig({
  astro: true,
  tailwind: {
    tailwindStylesheet: "src/assets/styles/global.css",
  },
  ignores: ["pnpm-lock.yaml", "package-lock.json", "src/frontend/tanstack/config/router/route-tree.gen.ts"],
});
