import { drizzle } from "drizzle-orm/libsql";

import { env } from "@/shared/env";

import * as schema from "./schema";

export const db = drizzle(env.DB_FILE_NAME, { schema, casing: "snake_case" });

export * as schema from "./schema";
export * as orm from "drizzle-orm";
