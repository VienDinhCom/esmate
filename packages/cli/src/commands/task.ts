import { defineCommand } from "citty";
import { consola } from "consola";
import { isJSONObject } from "es-toolkit";
import "@dotenvx/dotenvx/config";

import { pkg } from "@src/pkg";
import { execParallelly, execSingly } from "@src/utils";

export const task = defineCommand({
  meta: {
    name: "task",
    description: "Run a task defined in the package.json",
  },
  args: {
    task: {
      type: "positional",
      description: "A task to run",
      required: false,
    },
  },
  async run({ args }) {
    try {
      const task = pkg.tasks[args.task];

      if (!task) {
        consola.error(`Task "${args.task}" not found in package.json`);
        return;
      }

      const isParallel = isJSONObject(task);

      if (isParallel) {
        execParallelly(task as Record<string, string | string[]>);
      } else {
        execSingly(task as string | string[]);
      }
    } catch (error) {
      consola.error(error);
    }
  },
});
