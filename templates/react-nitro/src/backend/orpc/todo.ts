import { z } from "@esmate/shadcn/pkgs/zod";
import { invariant } from "@esmate/utils";

import { db, orm, schema } from "@/backend/lib/db";
import { os } from "@/backend/lib/orpc";
import { TodoInsertSchema, TodoSelectSchema } from "@/shared/schema";

export const todo = {
  list: os.output(z.array(TodoSelectSchema)).handler(async ({ context }) => {
    invariant(context.user, "unauthenticated");

    return db.query.todo.findMany({ where: orm.eq(schema.todo.userId, context.user.id) });
  }),

  add: os
    .input(TodoInsertSchema)
    .output(TodoSelectSchema)
    .handler(async ({ input, context }) => {
      invariant(context.user, "unauthenticated");

      const [todo] = await db
        .insert(schema.todo)
        .values({ ...input, userId: context.user.id })
        .returning();

      invariant(todo, "could not create todo");

      return todo;
    }),

  toggle: os
    .input(z.object({ id: z.string() }))
    .output(TodoSelectSchema)
    .handler(async ({ input, context }) => {
      invariant(context.user, "unauthenticated");

      const [todo] = await db
        .update(schema.todo)
        .set({ done: orm.not(schema.todo.done) })
        .where(orm.and(orm.eq(schema.todo.id, input.id), orm.eq(schema.todo.userId, context.user.id)))
        .returning();

      invariant(todo, "could not toggle todo");

      return todo;
    }),

  delete: os
    .input(z.object({ id: z.string() }))
    .output(TodoSelectSchema)
    .handler(async ({ input, context }) => {
      invariant(context.user, "unauthenticated");

      const [todo] = await db
        .delete(schema.todo)
        .where(orm.and(orm.eq(schema.todo.id, input.id), orm.eq(schema.todo.userId, context.user.id)))
        .returning();

      invariant(todo, "could not delete todo");

      return todo;
    }),
};
