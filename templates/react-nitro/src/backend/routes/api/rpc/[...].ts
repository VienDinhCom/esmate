import { RPCHandler } from "@orpc/server/fetch";
import { onError } from "@orpc/server";
import { defineEventHandler } from "nitro/h3";
import { router } from "@/backend/router";

const handler = new RPCHandler(router, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

export default defineEventHandler(async (event) => {
  const { matched, response } = await handler.handle(event.req, {
    prefix: "/api/rpc",
    context: {},
  });

  if (matched) {
    return response;
  }

  const message = "Not Found";
  event.res.status = 404;
  event.res.statusText = message;

  return message;
});
