import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "src",
  plugins: [
    react(),
    nitro({
      serverDir: "backend",
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
