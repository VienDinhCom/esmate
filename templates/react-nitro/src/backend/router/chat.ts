import { os } from "@orpc/server";
import { z } from "zod";
import { EventIterator } from "event-iterator";

type Message = {
  user: string;
  text: string;
  createdAt: number;
};

const listeners = new Set<(message: Message) => void>();

function emit(message: Message) {
  for (const listener of listeners) {
    listener(message);
  }
}

function subscribe(listener: (message: Message) => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const chat = {
  send: os.input(z.object({ user: z.string(), text: z.string() })).handler(async ({ input }) => {
    const message = { ...input, createdAt: Date.now() };
    emit(message);
    return message;
  }),

  feed: os.handler(async function* () {
    const iterator = new EventIterator<Message>((queue) => {
      const listener = (message: Message) => queue.push(message);
      const unsubscribe = subscribe(listener);
      return () => unsubscribe();
    });

    for await (const message of iterator) {
      yield message;
    }
  }),
};
