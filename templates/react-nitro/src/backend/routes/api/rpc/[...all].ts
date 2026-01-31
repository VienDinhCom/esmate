import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { CORSPlugin } from "@orpc/server/plugins";
import { defineEventHandler } from "nitro/h3";

import { createContext } from "@/backend/lib/orpc";
import { router } from "@/backend/orpc";

const handler = new RPCHandler(router, {
  plugins: [new CORSPlugin()],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

export default defineEventHandler(async (event) => {
  const { matched, response } = await handler.handle(event.req, {
    prefix: "/api/rpc",
    context: await createContext(event),
  });

  if (matched) {
    return response;
  }

  return new Response("Not found", { status: 404 });
});
