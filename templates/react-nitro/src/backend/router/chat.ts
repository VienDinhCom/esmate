import { os, EventPublisher } from "@orpc/server";
import { z } from "zod";

type Message = {
  user: string;
  text: string;
  createdAt: number;
};

const publisher = new EventPublisher<{
  "message-updated": Message;
}>();

export const chat = {
  send: os.input(z.object({ user: z.string(), text: z.string() })).handler(async ({ input }) => {
    const message = { ...input, createdAt: Date.now() };
    publisher.publish("message-updated", message);
    return message;
  }),

  feed: os.handler(async function* () {
    const iterator = publisher.subscribe("message-updated");

    for await (const message of iterator) {
      yield message;
    }
  }),
};
