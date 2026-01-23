import { z } from "zod";

export const TodoSchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
});

export const TodoInsertSchema = TodoSchema.omit({ id: true });
