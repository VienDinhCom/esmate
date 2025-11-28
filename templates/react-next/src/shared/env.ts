import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

const stringBoolean = z.coerce
  .string()
  .default("false")
  .transform((val) => val === "true");

// https://env.t3.gg/docs/nextjs
export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    DATABASE_SEEDING: stringBoolean,
    DATABASE_MIGRATING: stringBoolean,

    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string(),
  },
  client: {},
  emptyStringAsUndefined: true,
  runtimeEnv: process.env as any, // eslint-disable-line @typescript-eslint/no-explicit-any
});
