import type { RouterClient } from "@orpc/server";

import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

import type { router } from "@backend/router";

const link = new RPCLink({
  url: `${window.location.origin}/api/rpc`,
});

export const rpc: RouterClient<typeof router> = createORPCClient(link);

export const rpcQuery = createTanstackQueryUtils(rpc);
