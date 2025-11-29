import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

// https://env.t3.gg/docs/nextjs
export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string(),
  },
  client: {},
  emptyStringAsUndefined: true,
  runtimeEnv: process.env as any, // eslint-disable-line @typescript-eslint/no-explicit-any
});
