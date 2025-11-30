import { defineConfig } from "drizzle-kit";
import { env } from "@/lib/env";

export default defineConfig({
  casing: "snake_case",
  dialect: "postgresql",
  out: "src/backend/database/migrations",
  schema: "src/backend/database/schema/index.ts",
  dbCredentials: { url: env.DATABASE_URL },
});
