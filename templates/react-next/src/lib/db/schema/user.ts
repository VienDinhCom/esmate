import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, varchar } from "drizzle-orm/pg-core";
import { session, account } from "./auth";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),

  stripeProductId: text(),
  stripeCustomerId: text().unique(),
  stripeSubscriptionId: text().unique(),
  subscriptionStatus: varchar({ length: 20 }),
  planName: varchar({ length: 50 }),
});

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));
