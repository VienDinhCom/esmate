import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/backend/database";

export const auth = betterAuth({
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
