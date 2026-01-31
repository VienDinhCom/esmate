import { invariant } from "@esmate/utils";
import { z } from "zod";

import { db, orm, schema } from "@/backend/lib/db";
import { authMiddleware, os } from "@/backend/lib/orpc";
import { TodoInsertSchema, TodoSelectSchema } from "@/shared/schema";

export const todo = {
  list: os
    .use(authMiddleware)
    .output(z.array(TodoSelectSchema))
    .handler(async ({ context }) => {
      return db.query.todo.findMany({ where: orm.eq(schema.todo.userId, context.user.id) });
    }),

  add: os
    .use(authMiddleware)
    .input(TodoInsertSchema)
    .output(TodoSelectSchema)
    .handler(async ({ input, context }) => {
      const [todo] = await db
        .insert(schema.todo)
        .values({ ...input, userId: context.user.id })
        .returning();

      invariant(todo, "could not create todo");

      return todo;
    }),

  toggle: os
    .use(authMiddleware)
    .input(z.object({ id: z.string() }))
    .output(TodoSelectSchema)
    .handler(async ({ input, context }) => {
      const [todo] = await db
        .update(schema.todo)
        .set({ done: orm.not(schema.todo.done) })
        .where(orm.and(orm.eq(schema.todo.id, input.id), orm.eq(schema.todo.userId, context.user.id)))
        .returning();

      invariant(todo, "could not toggle todo");

      return todo;
    }),

  delete: os
    .use(authMiddleware)
    .input(z.object({ id: z.string() }))
    .output(TodoSelectSchema)
    .handler(async ({ input, context }) => {
      const [todo] = await db
        .delete(schema.todo)
        .where(orm.and(orm.eq(schema.todo.id, input.id), orm.eq(schema.todo.userId, context.user.id)))
        .returning();

      invariant(todo, "could not delete todo");

      return todo;
    }),
};
