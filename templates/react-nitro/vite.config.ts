import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter as router } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    router({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "src/frontend/routes",
      generatedRouteTree: "src/frontend/route-tree.gen.ts",
    }),
    react(),
    nitro({
      serverDir: "src/backend",
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
