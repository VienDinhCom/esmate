import { createEnv } from "@t3-oss/env-core";
import process from "node:process";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",

  client: {},

  server: {
    DB_FILE_NAME: z.string(),
    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string(),
  },

  // eslint-disable-next-line node/no-process-env
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
