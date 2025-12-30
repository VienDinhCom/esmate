import { z } from "zod";

export type ExtractBody<Fn extends { options: unknown }> = Fn["options"] extends { body: infer S }
  ? S extends z.ZodType
    ? z.input<S>
    : never
  : never;
