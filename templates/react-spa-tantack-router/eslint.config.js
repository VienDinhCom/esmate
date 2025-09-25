// @ts-check
import { defineConfig } from "esmate/eslint";

export default defineConfig({
  type: "app",
  react: true,
  ignores: ["src/routeTree.gen.ts"],
});
