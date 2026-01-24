import { defineConfig } from "drizzle-kit";
import "dotenv/config";

import { env } from "@/shared/env";

export default defineConfig({
  dialect: "sqlite",
  casing: "snake_case",
  out: "./src/backend/database/migrations",
  schema: "./src/backend/database/schema/index.ts",
  dbCredentials: {
    url: env.DB_FILE_NAME,
  },
});
