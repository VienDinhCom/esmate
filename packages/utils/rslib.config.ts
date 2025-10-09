import { defineConfig } from "@rslib/core";

// https://lib.rsbuild.dev/config/
export default defineConfig({
  lib: [
    {
      format: "esm",
      syntax: ["ES2022"],
      dts: true,
      bundle: false,
    },
  ],
  source: {},
  output: {
    target: "node",
    cleanDistPath: true,
    // copy: [
    //   {
    //     context: "src",
    //     from: "**/*.css",
    //     globOptions: { dot: true },
    //   },
    // ],
  },
});
