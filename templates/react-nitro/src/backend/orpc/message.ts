import { invariant } from "@esmate/utils";
import { eventIterator, EventPublisher } from "@orpc/server";
import { z } from "zod";

import { db, schema } from "@/backend/lib/db";
import { os } from "@/backend/lib/orpc";
import { MessageInsertSchema, MessageSelectSchema, MessageSelectSchemaWithSender } from "@/shared/schema";

const publisher = new EventPublisher<{
  sent: z.infer<typeof MessageSelectSchemaWithSender>;
}>();

export const message = {
  send: os
    .input(MessageInsertSchema)
    .output(MessageSelectSchema)
    .handler(async ({ input, context }) => {
      const auth = await context.authenticate();
      const [message] = await db
        .insert(schema.message)
        .values({ ...input, userId: auth.user.id })
        .returning();

      invariant(message, "could not create message");

      const sender = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.id, auth.user.id),
      });

      invariant(sender, "could not find sender");

      publisher.publish("sent", {
        ...message,
        sender,
      });

      return message;
    }),

  fetch: os.output(z.array(MessageSelectSchemaWithSender)).handler(async ({ context }) => {
    await context.authenticate();
    return db.query.message.findMany({ with: { sender: true } });
  }),

  feed: os.output(eventIterator(MessageSelectSchemaWithSender)).handler(async function* ({ context }) {
    await context.authenticate();

    const iterator = publisher.subscribe("sent");

    for await (const message of iterator) {
      yield message;
    }
  }),
};
