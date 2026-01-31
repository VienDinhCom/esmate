// @ts-check
import { defineConfig } from "@esmate/prettier";

export default defineConfig({
  tailwind: {
    tailwindFunctions: ["cn"],
    tailwindStylesheet: "src/assets/styles/global.css",
  },
  ignores: ["./src/lib/tanstack/router.ts"],
});
