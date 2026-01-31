import tailwind from "@tailwindcss/vite";
import { tanstackRouter as router } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    router({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "./src/frontend/routes",
      generatedRouteTree: "./src/frontend/lib/tanstack/router.ts",
    }),
    react(),
    tailwind(),
    nitro({
      serverDir: "./src/backend",
    }),
    tsconfigPaths(),
  ],
  nitro: {
    preset: "node",
  },
});
