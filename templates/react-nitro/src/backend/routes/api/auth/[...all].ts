import { defineEventHandler } from "nitro/h3";

import { auth } from "@/backend/lib/auth";

export default defineEventHandler((event) => {
  return auth.handler(event.req);
});
