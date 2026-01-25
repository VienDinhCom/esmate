import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";

import { message } from "@/backend/lib/db/schema";

import { UserSelectSchema } from "./user";

export const MessageSelectSchema = createSelectSchema(message);
export const MessageSelectSchemaWithSender = MessageSelectSchema.extend({ sender: UserSelectSchema });
export const MessageInsertSchema = createInsertSchema(message).omit({ id: true, userId: true });
export const MessageUpdateSchema = createUpdateSchema(message);
