// @ts-check
import { defineConfig } from "@esmate/prettier";

export default defineConfig({
  astro: true,
  tailwind: {
    tailwindStylesheet: "src/assets/styles/global.css",
  },
  ignores: ["bun.lock", "deno.lock", "yarn.lock", "pnpm-lock.yaml", "package-lock.json"],
});
