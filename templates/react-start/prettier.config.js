// @ts-check
import { defineConfig } from "@esmate/prettier";

export default defineConfig({
  tailwind: {
    tailwindFunctions: ["cn"],
    tailwindStylesheet: "src/frontend/assets/styles/global.css",
  },
  ignores: ["bun.lock", "deno.lock", "yarn.lock", "pnpm-lock.yaml", "package-lock.json"],
});
