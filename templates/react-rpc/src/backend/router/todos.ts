import { os } from "@orpc/server";
import * as z from "zod";
import { TodoSchema } from "../schema";

const todosData = [
  { id: 1, name: "Get groceries" },
  { id: 2, name: "Buy a new phone" },
  { id: 3, name: "Finish the project" },
];

export const todos = {
  list: os
    .input(z.object({}))
    .output(z.array(TodoSchema))
    .handler(() => {
      return todosData;
    }),
  add: os
    .input(z.object({ name: z.string() }))
    .output(TodoSchema)
    .handler(({ input }) => {
      const newTodo = { id: todosData.length + 1, name: input.name };
      todosData.push(newTodo);
      return newTodo;
    }),
};
