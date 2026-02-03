import { drizzle } from "drizzle-orm/libsql";

import type { Env } from "@/backend/lib/env";

import * as schema from "./schema";

export function createDatabase(env: Env) {
  return drizzle(env.DB_FILE_NAME, { schema, casing: "snake_case" });
}

export * as schema from "./schema";
export * as orm from "drizzle-orm";
