import { defineEventHandler } from "nitro/h3";

import { createAuth } from "@/backend/lib/auth";

export default defineEventHandler((event) => {
  return createAuth(event.context.env).handler(event.req as Request);
});
