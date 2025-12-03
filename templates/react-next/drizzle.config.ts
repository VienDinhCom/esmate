import { defineConfig } from "drizzle-kit";
import { env } from "@/lib/env";

export default defineConfig({
  casing: "snake_case",
  dialect: "postgresql",
  out: "src/lib/db/migrations",
  schema: "src/lib/db/schema/index.ts",
  dbCredentials: { url: env.DATABASE_URL },
});
