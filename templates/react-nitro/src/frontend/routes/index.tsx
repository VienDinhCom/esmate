import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent } from "@esmate/shadcn/components/ui/card";
import { ExternalLink } from "@esmate/shadcn/pkgs/lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";

import logo from "@/frontend/assets/images/logo.svg";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex flex-col items-center py-10">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardContent className="px-8 pt-12 pb-12">
          <div className="flex flex-col items-center space-y-8">
            <img src={logo} className="h-32 w-32 animate-[spin_20s_linear_infinite]" alt="logo" />

            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tight">ESMate React Nitro</h1>
              <p className="text-lg text-muted-foreground">
                Edit <code className="rounded bg-muted px-2 py-1 font-mono text-sm">src/frontend/routes/index.tsx</code>{" "}
                and save to reload.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 pt-4 sm:w-auto sm:flex-row">
              <Button asChild>
                <a href="https://github.com/viendinhcom/esmate" target="_blank" rel="noopener noreferrer">
                  Learn ESMate
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/todos">Todos</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/chat">Chat</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
