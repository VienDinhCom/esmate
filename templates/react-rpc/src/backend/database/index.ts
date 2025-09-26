import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema.ts";
import { env } from "@/shared/env";

export const database = drizzle(env.DATABASE_URL, { schema });
