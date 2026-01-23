// @ts-check
import { defineConfig } from "@esmate/prettier";

export default defineConfig({
  tailwind: {
    tailwindFunctions: ["cn"],
    tailwindStylesheet: "src/frontend/assets/styles/global.css",
  },
  ignores: ["src/frontend/lib/tanstack/router.ts"],
});
