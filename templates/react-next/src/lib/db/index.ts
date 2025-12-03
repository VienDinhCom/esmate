import { env } from "@/lib/env";
import { drizzle } from "drizzle-orm/postgres-js";
import * as orm from "drizzle-orm";
import * as schema from "./schema";

export { schema, orm };

export const db = drizzle(env.DATABASE_URL, { schema, casing: "snake_case" });
