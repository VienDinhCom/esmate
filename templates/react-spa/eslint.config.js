// @ts-check
import { defineConfig } from "@esmate/eslint";

export default defineConfig({
  type: "app",
  react: true,
  tanstack: {
    query: true,
    router: true,
  },
  ignores: ["src/routeTree.gen.ts"],
});
