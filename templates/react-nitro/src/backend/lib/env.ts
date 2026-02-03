import type { H3Event } from "nitro/h3";

import { env } from "node:process";
import { z } from "zod";

export function createEnv(event: H3Event) {
  const url = new URL(event.req.url);

  return z
    .object({
      AUTH_SECRET: z.string(),
      BASE_URL: z.url().default(url.origin),
      DB_FILE_NAME: z.string(),
    })
    .readonly()
    .parse(env);
}

export type Env = ReturnType<typeof createEnv>;
