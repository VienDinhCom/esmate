import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";

import { user } from "@/backend/lib/db/schema";

export const UserSelectSchema = createSelectSchema(user);
export const UserInsertSchema = createInsertSchema(user).omit({ id: true });
export const UserUpdateSchema = createUpdateSchema(user);
