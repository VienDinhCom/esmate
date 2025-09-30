import { drizzle } from "drizzle-orm/postgres-js";

import { env } from "@shared/env";

import * as schema from "./schema.ts";

export const database = drizzle(env.DATABASE_URL, { schema });
