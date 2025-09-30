import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { defineConfig, envField } from "astro/config";

export default defineConfig({
  server: { port: 3000 },
  site: "https://example.com",
  integrations: [mdx(), sitemap(), react()],
  vite: {
    plugins: [
      tailwindcss(),
      tanstackRouter({
        autoCodeSplitting: true,
        routesDirectory: "./src/frontend/tanstack/routes",
        generatedRouteTree: "./src/frontend/tanstack/config/router/index.ts",
      }),
    ],
  },
  env: {
    schema: {
      DATABASE_URL: envField.string({
        access: "secret",
        context: "server",
      }),
      BETTER_AUTH_URL: envField.string({
        access: "secret",
        context: "server",
      }),
      BETTER_AUTH_SECRET: envField.string({
        access: "secret",
        context: "server",
      }),
    },
  },
});
