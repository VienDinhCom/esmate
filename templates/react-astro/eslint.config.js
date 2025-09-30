// @ts-check
import { defineConfig } from "@esmate/eslint";

export default defineConfig({
  type: "app",
  astro: true,
  react: true,
  tanstack: {
    query: true,
    router: true,
  },
  ignores: ["src/backend/database/migrations", "src/frontend/tanstack/config/router/index.ts"],
});
