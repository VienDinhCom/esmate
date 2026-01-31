import type { H3Event } from "nitro/h3";

import { os as procedure } from "@orpc/server";

import { auth } from "@/backend/lib/auth";

export async function createContext(event: H3Event) {
  const session = await auth.api.getSession({ headers: event.req.headers });

  return { user: session?.user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

export const os = procedure.$context<Context>();
