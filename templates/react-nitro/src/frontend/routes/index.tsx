import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent } from "@esmate/shadcn/components/ui/card";
import { ExternalLink } from "@esmate/shadcn/pkgs/lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import logo from "@/frontend/assets/images/logo.svg";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex min-h-screen flex-col items-center justify-center p-8">
        <Card className="w-full max-w-2xl border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <CardContent className="px-8 pt-12 pb-12">
            <div className="flex flex-col items-center space-y-8">
              <img src={logo} className="h-32 w-32 animate-[spin_20s_linear_infinite] drop-shadow-2xl" alt="logo" />

              <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white">Welcome to Your App</h1>
                <p className="text-lg text-slate-300">
                  Edit{" "}
                  <code className="rounded bg-slate-700 px-2 py-1 text-sm text-cyan-400">src/routes/index.tsx</code> and
                  save to reload.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 pt-4 sm:w-auto sm:flex-row">
                <Button variant="default" className="bg-cyan-600 text-white hover:bg-cyan-700" asChild>
                  <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <Button variant="outline" asChild>
                  <a href="https://github.com/viendinhcom/esmate" target="_blank" rel="noopener noreferrer">
                    Learn ESMate
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <Button variant="outline" asChild>
                  <a href="https://tanstack.com" target="_blank" rel="noopener noreferrer">
                    Learn TanStack
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="mt-8 text-sm text-slate-500">Built with React, TanStack Router, and shadcn/ui</p>
      </div>
    </div>
  );
}
