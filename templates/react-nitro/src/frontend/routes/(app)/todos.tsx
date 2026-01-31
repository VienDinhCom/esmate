import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Input } from "@esmate/shadcn/components/ui/input";
import { CheckCircle2, Circle, Trash2 } from "@esmate/shadcn/pkgs/lucide-react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { orpcQuery } from "@/frontend/lib/orpc";

export const Route = createFileRoute("/(app)/todos")({
  component: RouteComponent,
});

function RouteComponent() {
  const [todo, setTodo] = useState("");

  const { data, refetch } = useSuspenseQuery(orpcQuery.todo.list.queryOptions());

  const { mutate: addTodo } = useMutation(
    orpcQuery.todo.add.mutationOptions({
      onSuccess: () => {
        refetch();
        setTodo("");
      },
    }),
  );

  const { mutate: toggleTodo } = useMutation(
    orpcQuery.todo.toggle.mutationOptions({
      onSuccess: () => {
        refetch();
      },
    }),
  );

  const { mutate: deleteTodo } = useMutation(
    orpcQuery.todo.delete.mutationOptions({
      onSuccess: () => {
        refetch();
      },
    }),
  );

  const submitTodo = useCallback(() => {
    addTodo({ name: todo });
  }, [addTodo, todo]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>My Todos</CardTitle>
          <CardDescription>Manage your tasks and stay organized</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            {data.length === 0 ? (
              <div>
                <CheckCircle2 />
                <p>No todos yet. Add one to get started!</p>
              </div>
            ) : (
              data.map((t) => (
                <div key={t.id} className="">
                  <button type="button" onClick={() => toggleTodo({ id: t.id })} className="">
                    {t.done ? <CheckCircle2 /> : <Circle />}
                  </button>
                  <span className={` ${t.done ? "line-through" : ""}`}>{t.name}</span>
                  <Button variant="ghost" size="icon" onClick={() => deleteTodo({ id: t.id })} className="">
                    <Trash2 />
                  </Button>
                </div>
              ))
            )}
          </div>

          <div>
            <Input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && todo.trim().length > 0) {
                  submitTodo();
                }
              }}
              placeholder="Enter a new todo..."
              className=""
            />
            <Button type="button" disabled={todo.trim().length === 0} onClick={submitTodo}>
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
