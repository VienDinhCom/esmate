import { defineCommand } from "citty";
import { consola } from "consola";
import dotenv from "dotenv";
import { isJSONObject } from "es-toolkit";

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
  async run({ args, rawArgs }) {
    try {
      const task = pkg.tasks[args.task];
      const extraArgs = rawArgs.slice(1);

      if (!task) {
        consola.error(`Task "${args.task}" not found in package.json`);
        return;
      }

      const isParallel = isJSONObject(task);

      dotenv.config({ quiet: true });

      if (isParallel) {
        execParallelly(task as Record<string, string | string[]>, extraArgs);
      } else {
        execSingly(task as string | string[], extraArgs);
      }
    } catch (error) {
      consola.error(error);
    }
  },
});
