import { headers } from "next/headers";
import { betterAuth } from "better-auth";
import { redirect } from "next/navigation";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";

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
  plugins: [nextCookies()], // make sure nextCookies() is the last plugin in the array
  user: {
    deleteUser: {
      enabled: true,
    },
  },
});

interface Auth {
  id: string;
  name: string;
  email: string;
}

export async function getAuth(): Promise<Auth | null> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return null;

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  };
}

export async function getAuthOrThrow(): Promise<Auth> {
  const auth = await getAuth();

  if (!auth) throw new Error("Not authenticated");

  return auth;
}

export async function getAuthOrRedirect(redirectUrl?: string): Promise<Auth> {
  const auth = await getAuth();

  if (!auth) redirect(redirectUrl || "/auth/sign-in");

  return auth;
}
