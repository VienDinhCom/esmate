import { os, EventPublisher } from "@orpc/server";
import { z } from "zod";
import { ChatMessageInsertSchema, ChatMessageSchema } from "@/shared/schema";

const publisher = new EventPublisher<{
  "message-sent": z.infer<typeof ChatMessageSchema>;
}>();

export const chat = {
  send: os.input(ChatMessageInsertSchema).handler(async ({ input }) => {
    const message = { ...input, createdAt: Date.now() };
    publisher.publish("message-sent", message);
    return message;
  }),

  feed: os.handler(async function* () {
    const iterator = publisher.subscribe("message-sent");

    for await (const message of iterator) {
      yield message;
    }
  }),
};
