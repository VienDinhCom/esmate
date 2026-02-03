import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import type { Env } from "@/backend/lib/env";

import { createDatabase } from "@/backend/database";

export function createAuth(env: Env) {
  const db = createDatabase(env);

  return betterAuth({
    baseURL: env.BASE_URL,
    secret: env.AUTH_SECRET,
    database: drizzleAdapter(db, {
      provider: "sqlite",
    }),
    emailAndPassword: {
      enabled: true,
    },
    rateLimit: {
      enabled: true,
    },
    user: {
      deleteUser: {
        enabled: true,
      },
    },
  });
}
