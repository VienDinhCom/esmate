import type { ConcurrentlyCommandInput } from "concurrently";
import type { JsonValue } from "type-fest";

import concurrently from "concurrently";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import process from "node:process";

function mapArgs(command: string, args?: string[]): string {
  if (args?.length === 0) {
    command = command.replace(/\$\d+/g, "");
  } else {
    args?.forEach((arg, index) => {
      command = command.replace(`$${index + 1}`, arg);
    });
  }

  return command;
}

export function execSingly(command: string | string[], args?: string[]): void {
  const cmd = Array.isArray(command) ? command.map((cmd) => mapArgs(cmd, args)).join(" && ") : mapArgs(command, args);
  const { env } = process;

  spawnSync(cmd, { shell: true, stdio: "inherit", env });
}

export async function execParallelly(commands: Record<string, string | string[]>, args?: string[]): Promise<void> {
  const concurrentCommands: ConcurrentlyCommandInput[] = [];

  for (const [name, command] of Object.entries(commands)) {
    const cmd = Array.isArray(command) ? command.map((cmd) => mapArgs(cmd, args)).join(" && ") : mapArgs(command, args);
    const { env } = process;

    concurrentCommands.push({ name, command: cmd, env });
  }

  await concurrently(concurrentCommands, {
    handleInput: true,
    prefixColors: "auto",
    killOthersOn: "failure",
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
