import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), react()],
  vite: {
    plugins: [
      tanstackRouter({
        autoCodeSplitting: true,
        routesDirectory: "./src/frontend/tanstack/routes",
        generatedRouteTree: "./src/frontend/tanstack/config/router/index.ts",
      }),
    ],
  },
});
