import { defineConfig } from "drizzle-kit";
import process from "node:process";
import "dotenv/config";

export default defineConfig({
  out: "src/backend/database/migrations",
  schema: "src/backend/database/schema.ts",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: process.env.DATABASE_URL || "", // eslint-disable-line node/no-process-env
  },
});
