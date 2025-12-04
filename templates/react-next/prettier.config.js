// @ts-check
import { defineConfig } from "@esmate/prettier";

export default defineConfig({
  tailwind: {
    tailwindFunctions: ["cn"],
    tailwindStylesheet: "src/app/globals.css",
  },
  ignores: ["src/backend/database/migrations"],
});
