import { defineEventHandler } from "nitro/h3";

import { createEnv } from "@/backend/lib/env";

export default defineEventHandler((event) => {
  event.context.env = createEnv(event);
});
