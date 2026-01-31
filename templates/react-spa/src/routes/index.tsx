import { Badge } from "@esmate/shadcn/components/ui/badge";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Separator } from "@esmate/shadcn/components/ui/separator";
import { Code, ExternalLink, Rocket, Sparkles, Zap } from "@esmate/shadcn/pkgs/lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import logo from "@/assets/images/logo.svg";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-20">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.15),transparent)]" />

        <div className="flex max-w-4xl flex-col items-center gap-8 text-center">
          <img
            src={logo}
            alt="ESMate Logo"
            className="h-24 w-24 animate-[spin_20s_linear_infinite] drop-shadow-lg sm:h-32 sm:w-32"
          />

          <div className="flex flex-col gap-4">
            <Badge variant="secondary" className="mx-auto w-fit">
              Modern Create React App Replacement
            </Badge>

            <h1 className="bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              ESMate React SPA
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              A production-ready React SPA template with batteries included. Type-safe routing, powerful data fetching,
              and beautiful UI components out of the box.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button size="lg" asChild>
              <a
                href="https://github.com/VienDinhCom/esmate/tree/main/templates/react-spa"
                target="_blank"
                rel="noopener noreferrer"
              >
                ESMate React SPA
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Edit <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">src/routes/index.tsx</code> and save
            to reload.
          </p>
        </div>
      </section>

      <Separator />

      {/* Features Section */}
      <section className="container mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything You Need to Ship Fast</h2>
            <p className="max-w-2xl text-muted-foreground">
              Stop wasting time on boilerplate. Start building features that matter from day one.
            </p>
          </div>

          <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="group transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Vite-powered dev server with instant HMR. Build times measured in milliseconds, not minutes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Code className="h-6 w-6" />
                </div>
                <CardTitle>Type-Safe Routing</CardTitle>
                <CardDescription>
                  TanStack Router with full TypeScript support. Catch routing errors at compile time, not runtime.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Rocket className="h-6 w-6" />
                </div>
                <CardTitle>Data Fetching Made Easy</CardTitle>
                <CardDescription>
                  TanStack Query handles caching, background updates, and stale data for you automatically.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* Tech Stack Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <Sparkles className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built with the Best</h2>
              <p className="max-w-2xl text-muted-foreground">
                A carefully curated stack of modern tools that work beautifully together.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "React 19",
                "TypeScript",
                "Vite",
                "TanStack Router",
                "TanStack Query",
                "shadcn/ui",
                "Tailwind CSS",
                "Vitest",
              ].map((tech) => (
                <Badge key={tech} variant="outline" className="px-4 py-2 text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ using <a href="https://github.com/VienDinhCom/esmate">ESMate</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
