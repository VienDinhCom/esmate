import { DATABASE_URL } from "astro:env/server";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schema.ts";

export const database = drizzle(DATABASE_URL, { schema });
