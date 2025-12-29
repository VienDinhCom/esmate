import { headers } from "next/headers";
import { betterAuth } from "better-auth";
import { redirect } from "next/navigation";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { stripePlugin } from "./stripe";
import { db } from "@/lib/db";
import { adminPlugin } from "./admin";

// https://www.better-auth.com/docs/integrations/next
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
    adminPlugin,
    stripePlugin,
    nextCookies(), // make sure nextCookies() is the last plugin in the array
  ],
});

interface Auth {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export async function getAuth(): Promise<Auth | null> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return null;

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: (session.user.role as null) || "user",
  };
}

export async function getAuthOrThrow(): Promise<Auth> {
  const auth = await getAuth();

  if (!auth) throw new Error("Not authenticated");

  return auth;
}

export async function getAuthOrSignIn(redirectUrl?: string): Promise<Auth> {
  const auth = await getAuth();

  if (!auth) {
    redirect(redirectUrl ? `/auth/sign-in?redirect=${redirectUrl}` : `/auth/sign-in`);
  }

  return auth;
}
