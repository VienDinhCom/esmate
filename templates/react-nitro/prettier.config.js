// @ts-check
import { defineConfig } from "@esmate/prettier";

export default defineConfig({
  tailwind: {
    tailwindFunctions: ["cn"],
    tailwindStylesheet: "src/frontend/assets/styles/global.css",
  },
  ignores: ["src/backend/lib/db/migrations", "src/frontend/lib/tanstack/router.ts"],
});
