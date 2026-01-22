import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter as router } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    router({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "src/frontend/routes",
      generatedRouteTree: "src/frontend/config/router/route-tree.gen.ts",
    }),
    react(),
    tailwindcss(),
    nitro({
      serverDir: "src/backend",
    }),
    tsconfigPaths(),
  ],
});
