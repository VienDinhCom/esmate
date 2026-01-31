import { Badge } from "@esmate/shadcn/components/ui/badge";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  ExternalLink,
  MessageSquare,
  Shield,
  Sparkles,
  Zap,
} from "@esmate/shadcn/pkgs/lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";

import logo from "@/frontend/assets/images/logo.svg";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-muted/50 to-background pt-10 pb-20 lg:py-32 lg:pt-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,var(--color-primary)_0%,transparent_100%)] opacity-5" />
        <div className="mx-auto max-w-5xl px-4 text-center">
          <div className="mb-8 flex justify-center">
            <img src={logo} alt="ESMate logo" className="h-48 w-48 animate-pulse" />
          </div>

          <Badge variant="secondary" className="mb-6">
            <Sparkles className="mr-1 h-3 w-3" />
            Modern MERN Stack Replacement
          </Badge>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              ESMate React Nitro
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
            A modern full-stack template with React, Nitro Server Toolkit, oRPC type-safe APIs, TanStack Router, and
            beautiful UI powered by Shadcn. Everything you need to ship production-ready apps.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <a
                href="https://github.com/VienDinhCom/esmate/tree/main/templates/react-nitro"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/todos">
                Try the Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-10 pb-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Everything You Need</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              A carefully curated stack of modern technologies that work perfectly together.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <Zap className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Built on Vite and Nitro for instant dev server startup and blazing-fast HMR.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <Shield className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Type-Safe APIs</CardTitle>
                <CardDescription>
                  End-to-end type safety with oRPC. Write backend procedures, get automatic frontend types.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <CheckCircle2 className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Ready for Production</CardTitle>
                <CardDescription>Better Auth, Drizzle ORM, and battle-tested patterns out of the box.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Deployment Section */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Deploy Anywhere</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Nitro can generate different output formats suitable for different hosting providers from the same code
              base. Using built-in presets, you can easily configure Nitro to adjust its output format with almost no
              additional code or configuration!
            </p>
          </div>

          <div className="mb-12 text-center">
            <Card>
              <CardHeader>
                <CardTitle>Zero-Config Providers</CardTitle>
                <CardDescription>
                  When deploying to production using CI/CD, Nitro tries to automatically detect the provider environment
                  and set the right one without any additional configuration required. Currently, the providers below
                  can be auto-detected with zero config.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 justify-center gap-4 md:grid-cols-4">
                  {[
                    "Node.js",
                    "Bun",
                    "Deno",
                    "AWS Amplify",
                    "Azure",
                    "Cloudflare",
                    "Firebase App Hosting",
                    "Netlify",
                    "Stormkit",
                    "Vercel",
                    "Zeabur",
                    "Deno Deploy",
                  ].map((provider) => (
                    <div
                      key={provider}
                      className="flex items-center justify-center rounded-md border bg-background p-4 text-center font-medium shadow-xs"
                    >
                      {provider}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Apps Section */}
      <section className="bg-muted/30 pt-10 pb-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Demo Applications</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Explore fully functional demo apps built with this template to see the stack in action.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="group overflow-hidden transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <CardTitle>Todo App</CardTitle>
                </div>
                <CardDescription>
                  A complete CRUD application demonstrating oRPC mutations, optimistic updates, and real-time state
                  management with TanStack Query.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full" asChild>
                  <Link to="/todos">
                    Open Todos
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <CardTitle>Real-time Chat</CardTitle>
                </div>
                <CardDescription>
                  A live chat room showcasing oRPC subscriptions for real-time updates, message persistence, and
                  multi-user communication.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full" asChild>
                  <Link to="/chat">
                    Open Chat
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Build?</h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            Clone the template and start building your next project in minutes, not days.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <a
                href="https://github.com/VienDinhCom/esmate/tree/main/templates/react-nitro"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground">
          <p>
            Built with ❤️ using{" "}
            <a
              href="https://github.com/viendinhcom/esmate"
              className="font-medium text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ESMate
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
