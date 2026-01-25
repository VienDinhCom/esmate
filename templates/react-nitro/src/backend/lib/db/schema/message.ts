import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { createdAt, updatedAt } from "@/backend/lib/db/utils";

import { user } from "./auth";

export const message = sqliteTable("message", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  message: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id),
  createdAt,
  updatedAt,
});

export const messageRelations = relations(message, ({ one }) => ({
  sender: one(user, {
    fields: [message.userId],
    references: [user.id],
  }),
}));
