import type { env } from "@/backend/lib/env";

declare module "nitro/h3" {
  interface H3EventContext {
    env: ReturnType<typeof env>;
  }
}
