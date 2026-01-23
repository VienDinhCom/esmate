import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Input } from "@esmate/shadcn/components/ui/input";
import { Send, User } from "@esmate/shadcn/pkgs/lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useSubscription } from "@/frontend/hooks/use-subscription";

import { rpc, rpcQuery } from "@/frontend/utils/rpc";

export const Route = createFileRoute("/chat")({
  component: RouteComponent,
});

type Message = {
  user: string;
  text: string;
  createdAt: number;
};

function RouteComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState("Anonymous");
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useSubscription({
    fn: (signal) => rpc.chat.feed({}, { signal }),
    onData: (message) => {
      setMessages((prev) => [...prev, message]);
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    },
    deps: [],
  });

  const { mutate: sendMessage } = useMutation(
    rpcQuery.chat.send.mutationOptions({
      onSuccess: () => {
        setText("");
      },
    }),
  );

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim()) return;
    sendMessage({ user, text });
  };

  return (
    <div className="flex justify-center py-10 h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-2xl shadow-2xl flex flex-col h-full">
        <CardHeader className="space-y-1 shrink-0">
          <CardTitle className="text-3xl font-bold tracking-tight">Chat</CardTitle>
          <CardDescription className="text-base">Global chat room</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4 min-h-0">
          <div className="flex-1 overflow-y-auto space-y-4 pr-4">
            {messages.length === 0 ? (
              <div className="text-center text-slate-500 py-10">No messages yet. Say hello!</div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.user === user ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.user === user ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <div className="text-xs opacity-70 mb-1 font-bold">{msg.user}</div>
                    <div>{msg.text}</div>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">{new Date(msg.createdAt).toLocaleTimeString()}</div>
                </div>
              ))
            )}
            <div ref={scrollRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2 shrink-0 pt-4 border-t">
            <div className="flex gap-2">
              <div className="relative w-32 shrink-0">
                <User className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Name" className="pl-9" />
              </div>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!text.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
