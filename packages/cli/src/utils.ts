import type { ConcurrentlyCommandInput } from "concurrently";
import type { JsonValue } from "type-fest";

import concurrently from "concurrently";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import process from "node:process";

export function execSingly(command: string | string[]): void {
  const cmd = Array.isArray(command) ? command.join(" && ") : command;

  spawnSync(cmd, { shell: true, stdio: "inherit", env: process.env });
}

export async function execParallelly(commands: Record<string, string | string[]>): Promise<void> {
  const concurrentCommands: ConcurrentlyCommandInput[] = [];

  for (const [name, command] of Object.entries(commands)) {
    const cmd = Array.isArray(command) ? command.join(" && ") : command;

    concurrentCommands.push({ name, command: cmd, env: process.env });
  }

  await concurrently(concurrentCommands, {
    handleInput: true,
    prefixColors: "auto",
    killOthers: "failure",
  })
    .result.then(() => {})
    .catch(() => {});
}

export function npx(command: string): void {
  execSingly(`npx --yes ${command}`);
}

export function readJsonSync(filePath: string): JsonValue {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}
