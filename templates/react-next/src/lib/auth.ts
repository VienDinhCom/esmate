import "server-only";
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

export async function requireAuth() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/auth/sign-in");
}
