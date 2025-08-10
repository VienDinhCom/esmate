// @ts-check
import { defineConfig } from "esmate/prettier";

export default defineConfig({
  tailwind: {
    tailwindFunctions: ["cn"],
    tailwindStylesheet: "src/main.css",
  },
  ignores: ["src/routeTree.gen.ts"],
});
