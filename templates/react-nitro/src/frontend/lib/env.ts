import { z } from "zod";

export const env = z
  .object({
    VITE_EXAMPLE: z.string(),
  })
  .readonly()
  .parse(import.meta.env);
