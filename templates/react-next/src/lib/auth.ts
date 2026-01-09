import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import { createAccessControl, Role } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";
import { admin } from "better-auth/plugins";
import { stripe } from "@better-auth/stripe";
import { stripe as stripeClient, plans } from "@/lib/stripe";
import { env } from "@/lib/env";
import { headers } from "next/headers";

/**
 * Role Based Access Control
 */
export const RBAC = (() => {
  const statements = {
    ...defaultStatements,
    posts: ["create", "read any", "read own", "update any", "update own", "delete any", "delete own"],
  } as const;

  const ac = createAccessControl(statements);

  const roles: Record<string, Role> = {
    user: ac.newRole({
      posts: ["create", "read own", "update own", "delete own"],
    }),
    admin: ac.newRole({
      posts: ["create", "read any", "update any", "delete any"],
      ...adminAc.statements,
    }),
  };

  return { ac, roles, statements };
})();

/**
 * Better Auth Configuration
 */
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
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
  plugins: [
    admin({
      ac: RBAC.ac,
      roles: RBAC.roles,
      defaultRole: "user",
      adminRoles: ["admin"],
    }),
    stripe({
      stripeClient,
      createCustomerOnSignUp: true,
      stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
      subscription: {
        enabled: true,
        plans: async () => [await plans.base(), await plans.plus()],
      },
    }),
    nextCookies(), // make sure nextCookies() is the last plugin in the array
  ],
});

export type UserRole = "user" | "admin";

export type Permissions = {
  [R in keyof typeof RBAC.statements]?: (typeof RBAC.statements)[R][number][];
};

export interface Options {
  id?: string;
  callbackUrl?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Auth<P extends Permissions> {
  user: AuthUser;
  headers: Awaited<ReturnType<typeof headers>>;
  authorize: (permissions: P) => Promise<P>;
}
