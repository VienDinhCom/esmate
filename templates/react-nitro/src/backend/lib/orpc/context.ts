import type { H3Event } from "nitro/h3";

export async function createORPCContext(event: H3Event) {
  return {
    request: event.req,
    env: event.context.env,
  };
}

export type ORPCContext = Awaited<ReturnType<typeof createORPCContext>>;
