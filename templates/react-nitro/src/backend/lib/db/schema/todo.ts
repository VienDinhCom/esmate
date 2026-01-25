import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { createdAt, updatedAt } from "@/backend/lib/db/utils";

import { user } from "./auth";

export const todo = sqliteTable("todo", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text().notNull(),
  done: integer({ mode: "boolean" }).default(false).notNull(),
  userId: text()
    .notNull()
    .references(() => user.id),
  createdAt,
  updatedAt,
});

export const todoRelations = relations(todo, ({ one }) => ({
  owner: one(user, {
    fields: [todo.userId],
    references: [user.id],
  }),
}));
