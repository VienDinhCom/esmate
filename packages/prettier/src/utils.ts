import type { Config } from "prettier";
import path from "node:path";
import makeSynchronized from "make-synchronized";
import { resolveConfig, resolveConfigFile } from "prettier";
import { findUpSync } from "find-up";

export default makeSynchronized(import.meta, async (defaultConfig: Config = {}): Promise<Config> => {
  const configFile = await resolveConfigFile();

  if (configFile) {
    const userConfig = await resolveConfig(configFile);

    return { ...defaultConfig, ...userConfig };
  }

  return defaultConfig;
});

export function importPlugin(plugin: string): string {
  const __dirname = new URL(".", import.meta.url).pathname;

  return path.join(__dirname, "plugins", `${plugin}.js`);
}

export function findRootDir() {
  const pkgPath = findUpSync("package.json");

  if (pkgPath) {
    return path.parse(pkgPath).dir;
  } else {
    throw new Error("Could not find root directory where package.json is located");
  }
}
