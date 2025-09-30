import type { APIRoute } from "astro";

import { auth } from "@backend/utils/auth";

export const prerender = false;

export const ALL: APIRoute = async (ctx) => {
  return auth.handler(ctx.request);
};
