import { z } from "astro:schema";

export const TodoSchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
});
