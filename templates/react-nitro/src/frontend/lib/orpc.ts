import type { RouterClient } from "@orpc/server";

import { createORPCClient, onError, ORPCError } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

import type { router } from "@/backend/orpc";

const link = new RPCLink({
  url: `${window.location.origin}/api/rpc`,
  interceptors: [
    onError((error) => {
      if (error instanceof ORPCError) {
        if (error.code === "UNAUTHENTICATED") {
          window.location.href = "/auth/sign-in";
        }
      }
    }),
  ],
});

export const orpcClient = createORPCClient<RouterClient<typeof router>>(link);
export const orpcQuery = createTanstackQueryUtils(orpcClient);
