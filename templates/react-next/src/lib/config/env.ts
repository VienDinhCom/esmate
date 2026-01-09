import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

// https://env.t3.gg/docs/nextjs
export const env = createEnv({
  server: {
    BASE_URL: z.url(),
    DATABASE_URL: z.url(),

    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string(),

    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: process.env as any, // eslint-disable-line @typescript-eslint/no-explicit-any
});
