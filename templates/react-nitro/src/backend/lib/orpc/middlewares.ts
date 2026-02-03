import { ORPCError, os } from "@orpc/server";

import { createAuth } from "@/backend/lib/auth";

import type { ORPCContext } from "./context";

export const authMiddleware = os.$context<ORPCContext>().middleware(async ({ context, next }) => {
  const session = await createAuth(context.env).api.getSession({ headers: context.request.headers });

  if (!session?.user) {
    throw new ORPCError("UNAUTHORIZED", {
      message: "Please sign in to perform this action.",
    });
  }

  return next({
    context: {
      user: session.user,
      session: session.session,
    },
  });
});
