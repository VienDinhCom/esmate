import type { RouterClient } from "@orpc/server";

import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

import type { router } from "@/backend/orpc";

const link = new RPCLink({
  url: `${window.location.origin}/api/rpc`,
});

export const orpcClient = createORPCClient<RouterClient<typeof router>>(link);
export const orpcQuery = createTanstackQueryUtils(orpcClient);
