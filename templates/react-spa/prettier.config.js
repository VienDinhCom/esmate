// @ts-check
import { defineConfig } from "@esmate/prettier";

export default defineConfig({
  tailwind: {
    tailwindFunctions: ["cn"],
    tailwindStylesheet: "src/styles.css",
  },
  ignores: ["pnpm-lock.yaml", "package-lock.json", "src/routeTree.gen.ts"],
});
