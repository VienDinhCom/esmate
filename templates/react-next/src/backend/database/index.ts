import { env } from "@shared/env";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

export const database = drizzle(env.DATABASE_URL, { schema });
