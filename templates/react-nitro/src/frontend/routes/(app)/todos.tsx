import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Input } from "@esmate/shadcn/components/ui/input";
import { CheckCircle2, Circle, Plus, Trash2 } from "@esmate/shadcn/pkgs/lucide-react";
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
    if (todo.trim().length > 0) {
      addTodo({ name: todo });
    }
  }, [addTodo, todo]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Todos</CardTitle>
          <CardDescription>Manage your tasks and stay organized</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Todo List */}
          <div className="space-y-2">
            {data.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="text-muted-foreground">No todos yet. Add one to get started!</p>
              </div>
            ) : (
              data.map((t) => (
                <div
                  key={t.id}
                  className="group flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent/50"
                >
                  <button
                    type="button"
                    onClick={() => toggleTodo({ id: t.id })}
                    className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
                  >
                    {t.done ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <Circle className="h-5 w-5" />}
                  </button>
                  <span className={`flex-1 ${t.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                    {t.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo({ id: t.id })}
                    className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))
            )}
          </div>

          {/* Add Todo Form */}
          <div className="flex gap-2">
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
              className="flex-1"
            />
            <Button type="button" disabled={todo.trim().length === 0} onClick={submitTodo}>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
