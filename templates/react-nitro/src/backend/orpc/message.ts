import { z } from "@esmate/shadcn/pkgs/zod";
import { invariant } from "@esmate/utils";
import { eventIterator, EventPublisher } from "@orpc/server";

import { db, orm, schema } from "@/backend/lib/db";
import { authMiddleware, os } from "@/backend/lib/orpc";
import { MessageInsertSchema, MessageSelectSchema, MessageSelectSchemaWithSender } from "@/shared/schema";

const publisher = new EventPublisher<{
  sent: z.infer<typeof MessageSelectSchemaWithSender>;
}>();

export const message = {
  add: os
    .use(authMiddleware)
    .input(MessageInsertSchema)
    .output(MessageSelectSchema)
    .handler(async ({ input, context }) => {
      const [message] = await db
        .insert(schema.message)
        .values({ ...input, userId: context.user.id })
        .returning();

      invariant(message, "could not create message");

      const sender = await db.query.user.findFirst({
        where: orm.eq(schema.user.id, context.user.id),
      });

      invariant(sender, "could not find sender");

      publisher.publish("sent", {
        ...message,
        sender,
      });

      return message;
    }),

  list: os
    .use(authMiddleware)
    .output(z.array(MessageSelectSchemaWithSender))
    .handler(async () => {
      return db.query.message.findMany({ with: { sender: true } });
    }),

  subscribe: os
    .use(authMiddleware)
    .output(eventIterator(MessageSelectSchemaWithSender))
    .handler(async function* () {
      const iterator = publisher.subscribe("sent");

      for await (const message of iterator) {
        yield message;
      }
    }),
};
