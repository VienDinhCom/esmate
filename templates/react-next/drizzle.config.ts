import { defineConfig } from "drizzle-kit";
import { env } from "@/lib/config/env";

export default defineConfig({
  casing: "snake_case",
  dialect: "postgresql",
  out: "src/lib/database/migrations",
  schema: "src/lib/database/schema/index.ts",
  dbCredentials: { url: env.DATABASE_URL },
});
