import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { createdAt, updatedAt } from "@/backend/database/utils";

import { user } from "./auth";

export const chat = sqliteTable("chat", {
  id: text().primaryKey(),
  message: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id),
  createdAt,
  updatedAt,
});

export const chatRelations = relations(chat, ({ one }) => ({
  sender: one(user, {
    fields: [chat.userId],
    references: [user.id],
  }),
}));
