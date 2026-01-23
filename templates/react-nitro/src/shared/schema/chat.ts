import { z } from "zod";

export const ChatMessageSchema = z.object({
  user: z.string(),
  text: z.string(),
  createdAt: z.number(),
});

export const ChatMessageInsertSchema = ChatMessageSchema.omit({ createdAt: true });
