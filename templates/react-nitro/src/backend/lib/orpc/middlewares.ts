import { ORPCError, os } from "@orpc/server";

import { auth } from "@/backend/lib/auth";

import type { ORPCContext } from "./context";

export const authMiddleware = os.$context<ORPCContext>().middleware(async ({ context, next }) => {
  const session = await auth.api.getSession({ headers: context.event.req.headers });

  if (!session?.user) {
    throw new ORPCError("UNAUTHORIZED", {
      message: "Please sign in to perform this action.",
    });
  }

  return next({
    context: {
      user: session.user,
    },
  });
});
