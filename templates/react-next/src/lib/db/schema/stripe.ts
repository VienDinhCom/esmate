import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";

export const stripe = pgTable("stripe", {
  id: text()
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  productId: text(),
  customerId: text().unique(),
  subscriptionId: text().unique(),
  subscriptionStatus: varchar({ length: 20 }),
  planName: varchar({ length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const stripeRelations = relations(stripe, ({ one }) => ({
  user: one(user, {
    fields: [stripe.id],
    references: [user.id],
  }),
}));
