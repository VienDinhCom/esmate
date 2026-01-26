import type z from "zod";

import { useImmerState } from "@esmate/react/hooks";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Input } from "@esmate/shadcn/components/ui/input";
import { Send } from "@esmate/shadcn/pkgs/lucide-react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

import type { MessageSelectSchemaWithSender } from "@/shared/schema";

import { useSubscription } from "@/frontend/hooks";
import { authClient } from "@/frontend/lib/auth";
import { orpcClient, orpcQuery } from "@/frontend/lib/orpc";

export const Route = createFileRoute("/(app)/chat")({
  loader: ({ context }) => context.queryClient.ensureQueryData(orpcQuery.message.fetch.queryOptions()),
  component: RouteComponent,
});

interface State {
  messages: z.infer<typeof MessageSelectSchemaWithSender>[];
  message: string;
}

function RouteComponent() {
  const session = authClient.useSession();
  const { data: initialMessages } = useSuspenseQuery(orpcQuery.message.fetch.queryOptions());

  const [state, setState] = useImmerState<State>({
    messages: initialMessages,
    message: "",
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useSubscription({
    fn: (signal) => orpcClient.message.feed({}, { signal }),
    onData: (message) => {
      setState((draft) => {
        // Only add if it doesn't already exist (to avoid duplicates from fetch/subscription overlap)
        if (!draft.messages.find((m) => m.id === message.id)) {
          draft.messages.push(message);
        }
        return draft;
      });
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    },
    deps: [],
  });

  const { mutate: sendMessage } = useMutation(
    orpcQuery.message.send.mutationOptions({
      onSuccess: () => {
        setState((draft) => {
          draft.message = "";
          return draft;
        });
      },
    }),
  );

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!state.message.trim()) {
      return;
    }
    sendMessage({ message: state.message });
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] justify-center py-10">
      <Card className="flex h-full w-full max-w-2xl flex-col shadow-2xl">
        <CardHeader className="shrink-0 space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight">Chat</CardTitle>
          <CardDescription className="text-base">Global chat room</CardDescription>
        </CardHeader>
        <CardContent className="flex min-h-0 flex-1 flex-col gap-4">
          <div className="flex-1 space-y-4 overflow-y-auto pr-4">
            {state.messages.length === 0 ? (
              <div className="py-10 text-center text-slate-500">No messages yet. Say hello!</div>
            ) : (
              state.messages.map((message) => {
                const isCurrentUser = message.userId === session.data?.user.id;
                return (
                  <div key={message.id} className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        isCurrentUser ? "bg-blue-100 text-blue-900" : "bg-muted"
                      }`}
                    >
                      <div className="mb-1 text-xs font-bold opacity-70" title={message.id}>
                        {isCurrentUser ? "You" : message.sender.name}
                      </div>
                      <div>{message.message}</div>
                    </div>
                    <div className="mt-1 text-[10px] text-slate-400">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={scrollRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex shrink-0 flex-col gap-2 border-t pt-4">
            <div className="flex gap-2">
              <Input
                value={state.message}
                onChange={(e) =>
                  setState((draft) => {
                    draft.message = e.target.value;
                    return draft;
                  })
                }
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!state.message.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
