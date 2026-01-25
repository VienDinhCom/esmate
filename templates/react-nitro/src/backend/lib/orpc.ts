import type { H3Event } from "nitro/h3";

import { ORPCError, os as procedure } from "@orpc/server";

import { auth } from "@/backend/lib/auth";

export function createContext(event: H3Event) {
  return {
    authenticate: async () => {
      const session = await auth.api.getSession({ headers: event.req.headers });

      if (!session) {
        throw new ORPCError("UNAUTHENTICATED");
      }

      return { user: session.user };
    },
  };
}

export type Context = ReturnType<typeof createContext>;

export const os = procedure.$context<Context>();
