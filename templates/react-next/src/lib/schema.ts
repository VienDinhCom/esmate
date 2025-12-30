import { post, user } from "@/lib/db/schema";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";

export const UserSelectSchema = createSelectSchema(user);

export const PostSelectSchema = createSelectSchema(post);
export const PostInsertSchema = createInsertSchema(post).omit({ id: true, authorId: true });
export const PostUpdateSchema = createUpdateSchema(post).required({ authorId: true, id: true });
