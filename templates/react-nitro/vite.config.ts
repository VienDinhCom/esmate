import { defineConfig } from "vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    nitro({
      serverDir: "./src/backend",
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
