import { RPCHandler } from "@orpc/server/fetch";
import { router } from "@backend/router";
import type { APIRoute } from "astro";

const handler = new RPCHandler(router);

export const prerender = false;

export const ALL: APIRoute = async ({ request }) => {
  const { response } = await handler.handle(request, {
    prefix: "/api/rpc",
    context: {},
  });

  return response ?? new Response("Not found", { status: 404 });
};
