import { sql } from "drizzle-orm";
import { integer } from "drizzle-orm/sqlite-core";

export const createdAt = integer({ mode: "timestamp_ms" })
  .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
  .notNull();

export const updatedAt = integer({ mode: "timestamp_ms" })
  .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
  .$onUpdate(() => /* @__PURE__ */ new Date())
  .notNull();
