import { os, EventPublisher } from "@orpc/server";
import { z } from "zod";

type Message = {
  user: string;
  text: string;
  createdAt: number;
};

const publisher = new EventPublisher<{
  "message-sent": Message;
}>();

export const chat = {
  send: os.input(z.object({ user: z.string(), text: z.string() })).handler(async ({ input }) => {
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
