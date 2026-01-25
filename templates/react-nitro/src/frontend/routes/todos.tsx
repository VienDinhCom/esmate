import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Input } from "@esmate/shadcn/components/ui/input";
import { CheckCircle2, Circle, Trash2 } from "@esmate/shadcn/pkgs/lucide-react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { orpcQuery } from "@/frontend/lib/orpc";

export const Route = createFileRoute("/todos")({
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
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight">My Todos</CardTitle>
          <CardDescription className="text-base">Manage your tasks and stay organized</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            {data.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed border-slate-200 p-8 text-center dark:border-slate-800">
                <CheckCircle2 className="mx-auto mb-2 h-12 w-12 text-slate-300 dark:text-slate-700" />
                <p className="text-sm text-slate-500 dark:text-slate-400">No todos yet. Add one to get started!</p>
              </div>
            ) : (
              data.map((t) => (
                <div
                  key={t.id}
                  className="group flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => toggleTodo({ id: t.id })}
                    className="flex-shrink-0 transition-transform active:scale-90"
                  >
                    {t.done ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-slate-300 group-hover:text-slate-400" />
                    )}
                  </button>
                  <span
                    className={`flex-1 text-base font-medium transition-all ${
                      t.done ? "text-slate-400 line-through" : "text-slate-900 dark:text-slate-100"
                    }`}
                  >
                    {t.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo({ id: t.id })}
                    className="opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>

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
            <Button type="button" disabled={todo.trim().length === 0} onClick={submitTodo} className="px-6">
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
