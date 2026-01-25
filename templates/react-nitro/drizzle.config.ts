import { defineConfig } from "drizzle-kit";
import "dotenv/config";

import { env } from "@/shared/env";

export default defineConfig({
  dialect: "sqlite",
  casing: "snake_case",
  out: "./src/backend/lib/db/migrations",
  schema: "./src/backend/lib/db/schema/index.ts",
  dbCredentials: {
    url: env.DB_FILE_NAME,
  },
});
