import { invariant } from "@esmate/utils";
import { eventIterator, EventPublisher } from "@orpc/server";
import { z } from "zod";

import { db, orm, schema } from "@/backend/lib/db";
import { os } from "@/backend/lib/orpc";
import { MessageInsertSchema, MessageSelectSchema, MessageSelectSchemaWithSender } from "@/shared/schema";

const publisher = new EventPublisher<{
  sent: z.infer<typeof MessageSelectSchemaWithSender>;
}>();

export const message = {
  add: os
    .input(MessageInsertSchema)
    .output(MessageSelectSchema)
    .handler(async ({ input, context }) => {
      invariant(context.user, "unauthenticated");

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

  list: os.output(z.array(MessageSelectSchemaWithSender)).handler(async ({ context }) => {
    invariant(context.user, "unauthenticated");

    return db.query.message.findMany({ with: { sender: true } });
  }),

  subscribe: os.output(eventIterator(MessageSelectSchemaWithSender)).handler(async function* ({ context }) {
    invariant(context.user, "unauthenticated");

    const iterator = publisher.subscribe("sent");

    for await (const message of iterator) {
      yield message;
    }
  }),
};
