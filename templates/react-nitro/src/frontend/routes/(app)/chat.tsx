import { useImmerState } from "@esmate/react/hooks";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Input } from "@esmate/shadcn/components/ui/input";
import { MessageSquare, Send } from "@esmate/shadcn/pkgs/lucide-react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

import { useSubscription } from "@/frontend/hooks";
import { authClient } from "@/frontend/lib/auth";
import { orpcClient, orpcQuery } from "@/frontend/lib/orpc";

export const Route = createFileRoute("/(app)/chat")({
  component: RouteComponent,
});

interface State {
  message: string;
}

function RouteComponent() {
  const [state, setState] = useImmerState<State>({
    message: "",
  });

  const session = authClient.useSession();
  const messageListQuery = useSuspenseQuery(orpcQuery.message.list.queryOptions());
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBottom = () => {
    setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  useSubscription({
    subscribe: (signal) => orpcClient.message.subscribe({}, { signal }),
    onStarted: () => {
      scrollBottom();
    },
    onData: () => {
      messageListQuery.refetch();
      scrollBottom();
    },
  });

  const { mutate: sendMessage } = useMutation(
    orpcQuery.message.add.mutationOptions({
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

  const messages = messageListQuery.data;

  return (
    <div className="mx-auto flex max-w-2xl flex-col px-4 py-8">
      <Card className="flex flex-1 flex-col">
        <CardHeader>
          <CardTitle className="text-2xl">Chat</CardTitle>
          <CardDescription>Global chat room — messages are visible to everyone</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col space-y-4">
          {/* Messages Area */}
          <div
            className="flex-1 space-y-4 overflow-y-auto rounded-lg border bg-muted/30 p-4"
            style={{ minHeight: 300, maxHeight: 400 }}
          >
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <MessageSquare className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="text-muted-foreground">No messages yet. Say hello!</p>
              </div>
            ) : (
              <>
                {messages.map((message) => {
                  const isCurrentUser = message.userId === session.data?.user.id;
                  return (
                    <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[75%] rounded-lg px-4 py-2 ${
                          isCurrentUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
                        }`}
                      >
                        <div className="mb-1 text-xs font-medium opacity-80">
                          {isCurrentUser ? "You" : message.sender.name}
                        </div>
                        <div className="wrap-break-word">{message.message}</div>
                        <div className="mt-1 text-right text-xs opacity-60">
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={scrollRef} />
              </>
            )}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSubmit} className="flex gap-2">
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
