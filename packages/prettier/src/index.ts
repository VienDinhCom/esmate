import type { Config } from "prettier";

import type { AstroOptions } from "./plugins/astro";
import type { SvelteOptions } from "./plugins/svelte";
import type { TailwindOptions } from "./plugins/tailwind";

import { importPlugin } from "./utils";

interface Options {
  /**
   * Ignores files from formatting.
   *
   * So you don't have to use .prettierignore file.
   */
  ignores?: string[];
  /**
   * Enable Astro support.
   *
   * http://npm.im/prettier-plugin-astro
   */
  astro?: boolean | AstroOptions;
  /**
   * Enable Svelte support.
   *
   * http://npm.im/prettier-plugin-svelte
   */
  svelte?: boolean | SvelteOptions;
  /**
   * Enable TailwindCSS support.
   *
   * http://npm.im/prettier-plugin-tailwindcss
   */
  tailwind?: boolean | TailwindOptions;
}

export function defineConfig(options: Options, config?: Config): Config {
  const defaultConfig: Config = {
    semi: true,
    tabWidth: 2,
    useTabs: false,
    printWidth: 120,
    endOfLine: "auto",
    singleQuote: false,
    proseWrap: "always",
    trailingComma: "all",
  };

  const configs: Config[] = [config || {}];
  const plugins: Config["plugins"] = config?.plugins || [];
  const overrides: Config["overrides"] = config?.overrides || [];

  // Ignores files from formatting.
  {
    const ignores: string[] = ["pnpm-lock.yaml", "package-lock.json"];

    if (options?.ignores) {
      ignores.push(...options.ignores);
    }

    overrides.push({
      files: ignores,
      options: {
        rangeEnd: 0,
      },
    });
  }

  if (options?.astro) {
    plugins.push(importPlugin("astro"));
    configs.push(options.astro === true ? {} : (options.astro as Config));
    overrides.push({ files: "*.astro", options: { parser: "astro" } });
  }

  if (options?.svelte) {
    plugins.push(importPlugin("svelte"));
    configs.push(options.svelte === true ? {} : (options.svelte as Config));
    overrides.push({ files: "*.svelte", options: { parser: "svelte" } });
  }

  // Must come last to avoid conflicts with other plugins
  if (options?.tailwind) {
    plugins.push(importPlugin("tailwind"));
    configs.push(options.tailwind === true ? {} : (options.tailwind as Config));
  }

  return {
    ...configs.reduce((prev, curr) => ({ ...prev, ...curr }), defaultConfig),
    plugins,
    overrides,
  };
}
