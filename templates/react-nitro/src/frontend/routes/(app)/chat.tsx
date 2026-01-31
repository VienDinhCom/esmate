import { useImmerState } from "@esmate/react/hooks";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Input } from "@esmate/shadcn/components/ui/input";
import { Send } from "@esmate/shadcn/pkgs/lucide-react";
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

  useSubscription({
    subscribe: (signal) => orpcClient.message.subscribe({}, { signal }),
    onData: () => {
      messageListQuery.refetch();
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    },
  });

  const { mutate: sendMessage } = useMutation(
    orpcQuery.message.create.mutationOptions({
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
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Chat</CardTitle>
          <CardDescription>Global chat room</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            {messages.length === 0 ? (
              <div>No messages yet. Say hello!</div>
            ) : (
              messages.map((message) => {
                const isCurrentUser = message.userId === session.data?.user.id;
                return (
                  <div key={message.id}>
                    <div>
                      <div title={message.id}>{isCurrentUser ? "You" : message.sender.name}</div>
                      <div>{message.message}</div>
                    </div>
                    <div>{new Date(message.createdAt).toLocaleTimeString()}</div>
                  </div>
                );
              })
            )}
            <div ref={scrollRef} />
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <Input
                value={state.message}
                onChange={(e) =>
                  setState((draft) => {
                    draft.message = e.target.value;
                    return draft;
                  })
                }
                placeholder="Type a message..."
              />
              <Button type="submit" size="icon" disabled={!state.message.trim()}>
                <Send />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
