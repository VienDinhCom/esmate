// @ts-check
import { defineConfig } from "@esmate/eslint";

export default defineConfig({
  type: "app",
  astro: true,
  react: true,
  ignores: [".agents/**/*", ".claude/**/*", "src/components/ui/**/*"],
});
