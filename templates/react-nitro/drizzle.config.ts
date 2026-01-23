import { defineConfig } from "drizzle-kit";
import "dotenv/config";

import { env } from "@/shared/env";

export default defineConfig({
  out: "./src/backend/database/migrations",
  schema: "./src/backend/database/schema/index.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DB_FILE_NAME,
  },
});
