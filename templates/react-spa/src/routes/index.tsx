import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/images/logo.svg";
import { Card, CardContent } from "@esmate/shadcn/components/ui/card";
import { Button } from "@esmate/shadcn/components/ui/button";
import { ExternalLink } from "@esmate/shadcn/pkgs/lucide-react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex min-h-screen flex-col items-center justify-center p-8">
        <Card className="max-w-2xl w-full bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="pt-12 pb-12 px-8">
            <div className="flex flex-col items-center space-y-8">
              <img 
                src={logo} 
                className="h-32 w-32 animate-[spin_20s_linear_infinite] drop-shadow-2xl" 
                alt="logo" 
              />
              
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-white tracking-tight">
                  Welcome to Your App
                </h1>
                <p className="text-slate-300 text-lg">
                  Edit <code className="px-2 py-1 bg-slate-700 rounded text-sm text-cyan-400">src/routes/index.tsx</code> and save to reload.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-4">
                <Button
                  variant="default"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  asChild
                >
                  <a
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn React
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  asChild
                >
                  <a
                    href="https://github.com/viendinhcom/esmate"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn ESMate
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  asChild
                >
                  <a
                    href="https://tanstack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn TanStack
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <p className="mt-8 text-slate-500 text-sm">
          Built with React, TanStack Router, and shadcn/ui
        </p>
      </div>
    </div>
  );
}