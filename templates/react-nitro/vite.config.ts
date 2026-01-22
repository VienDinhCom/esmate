import { defineConfig } from "vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  root: "src",
  plugins: [
    nitro({
      serverDir: "backend",
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
