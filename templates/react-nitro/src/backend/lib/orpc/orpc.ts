import { os as osBuilder } from "@orpc/server";

import type { ORPCContext } from "./context";

export const os = osBuilder.$context<ORPCContext>();
