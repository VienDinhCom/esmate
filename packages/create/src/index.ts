#!/usr/bin/env node

import { defineCommand, runMain } from "citty";
import { consola } from "consola";
import { kebabCase, omit } from "es-toolkit";
import { downloadTemplate } from "giget";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

export const meta = (() => {
  const pkgPath = new URL("../package.json", import.meta.url);

  return JSON.parse(fs.readFileSync(pkgPath, "utf-8")) as {
    name: string;
    version: string;
    description: string;
  };
})();

const main = defineCommand({
  meta,
  args: {
    template: {
      type: "string",
      description: "A template to create",
      required: false,
    },
    name: {
      type: "positional",
      description: "The name of your project",
      required: false,
    },
  },
  async run({ args }) {
    try {
      let template = args.template;
      let name = kebabCase(args.name || args.template || "");

      const templates = ["react-spa", "react-astro"];

      if (template) {
        await downloadTemplate(`github:VienDinhCom/esmate/templates/${template}`, { dir: name });
      } else {
        template = await consola.prompt("Select a template: ", { type: "select", options: templates });
        name = kebabCase(await consola.prompt("Name your project: ", { type: "text", default: template }));

        await downloadTemplate(`github:VienDinhCom/esmate/templates/${template}`, { dir: name });
      }

      const packageJsonPath = path.join(name, "package.json");
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

      fs.writeFileSync(packageJsonPath, JSON.stringify({ name, ...omit(packageJson, ["name"]) }, null, 2));

      consola.log(`\nScaffolding project in ${path.join(process.cwd(), name)}...`);
      consola.log(`\nDone. Now run:\n`);

      consola.log(`cd ${name}`);
      consola.log(`npm install`);
      consola.log(`npm run dev`);
    } catch (error) {
      consola.error(error);
    }
  },
});

runMain(main);
