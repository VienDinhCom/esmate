import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      generatedRouteTree: "./src/lib/tanstack/router.ts",
    }),
    viteReact(),
    tailwindcss(),
    tsconfigPaths({
      projects: ["./tsconfig.json"],
    }),
  ],
});
