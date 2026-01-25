import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";

import { todo } from "@/backend/lib/db/schema";

export const TodoSelectSchema = createSelectSchema(todo);
export const TodoInsertSchema = createInsertSchema(todo).omit({ id: true, userId: true });
export const TodoUpdateSchema = createUpdateSchema(todo);
