import { Badge } from "@esmate/shadcn/components/ui/badge";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import {
  ArrowRight,
  Command,
  ExternalLink,
  Globe,
  LayoutTemplate,
  MessageSquare,
  Server,
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
      <section className="relative overflow-hidden bg-linear-to-b from-muted/50 to-background pt-10 pb-10 lg:pt-20 lg:pb-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,var(--color-primary)_0%,transparent_100%)] opacity-5" />
        <div className="mx-auto max-w-5xl px-4 text-center">
          <div className="mb-8 flex justify-center">
            <img src={logo} alt="ESMate logo" className="h-40 w-40 animate-pulse" />
          </div>

          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            The Future of Full-Stack React
          </Badge>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">Frontend Artistry.</span>
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Backend Power.
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-xl text-muted-foreground">
            Orchestrated by <strong>ESMate</strong>. A complete replacement for the MERN stack—bringing you React,
            Nitro, and Type-Safe APIs in perfect harmony.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <a
                href="https://github.com/VienDinhCom/esmate/tree/main/templates/react-nitro"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
              <Link to="/todos">
                View Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* The Three Pillars Section */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">The Full-Stack Trinity</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              A balanced architecture where every layer is a first-class citizen.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Pillar 1: Frontend */}
            <Card className="border-muted-foreground/20 bg-linear-to-br from-card to-muted/30 shadow-sm transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <LayoutTemplate className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Frontend Excellence</CardTitle>
                <CardDescription className="text-base">
                  Craft stunning interfaces with the bleeding edge of the React ecosystem.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <strong>React & Vite</strong> for instant speed
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <strong>TanStack Router</strong> for type-safe routing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <strong>TailwindCSS & Shadcn/UI</strong> styles
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Pillar 2: Backend */}
            <Card className="border-muted-foreground/20 bg-linear-to-br from-card to-muted/30 shadow-sm transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                  <Server className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Backend Power</CardTitle>
                <CardDescription className="text-base">
                  Server-side robustness without the complexity. Universal deployment ready.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <strong>Nitro Server</strong> for universal output
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <strong>oRPC</strong> for end-to-end type safety
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <strong>Drizzle ORM & Better Auth</strong> built-in
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Pillar 3: ESmate */}
            <Card className="border-muted-foreground/20 bg-linear-to-br from-card to-muted/30 shadow-sm transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                  <Command className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">The ESmate Advantage</CardTitle>
                <CardDescription className="text-base">
                  Your intelligent co-pilot. Automate workflows and ship faster.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                    <strong>Smart Task Runner</strong> for automation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                    <strong>Minimal-Config</strong> setup & standards
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                    <strong>Unified CLI</strong> for all lifecycle needs
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Deployment Section */}
      <section className="bg-muted/30 py-12">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Globe className="h-8 w-8" />
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight">Code Once, Deploy Anywhere</h2>
          <p className="mx-auto mb-12 max-w-3xl text-lg text-muted-foreground">
            Powered by Nitro, your app adapts to any environment. From edge workers to serverless functions and Node.js
            containers—automatic provider detection makes deployment effortless.
          </p>

          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
            {[
              "Vercel",
              "Netlify",
              "Cloudflare Workers",
              "AWS Lambda",
              "Azure Functions",
              "Bun",
              "Deno",
              "Node.js",
              "Firebase",
            ].map((platform) => (
              <Badge key={platform} variant="outline" className="bg-background px-4 py-2 text-base font-normal">
                {platform}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Apps Section */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">See It In Action</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Explore fully functional demo apps built with this exact template.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Link to="/todos" className="group">
              <Card className="h-full overflow-hidden transition-all hover:bg-muted/50 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground group-hover:scale-110 group-hover:bg-primary/90">
                    <Zap className="h-5 w-5" />
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    Todo App
                    <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </CardTitle>
                  <CardDescription>
                    A complete CRUD mastery showcase. Features optimistic UI updates, oRPC mutations, and TanStack Query
                    cache management.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/chat" className="group">
              <Card className="h-full overflow-hidden transition-all hover:bg-muted/50 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground group-hover:scale-110 group-hover:bg-primary/90">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    Real-time Chat
                    <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </CardTitle>
                  <CardDescription>
                    Experience the speed of oRPC Subscriptions. Server-Sent Events (SSE) power this live chat with
                    instant message delivery and presence.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="mb-4 text-sm text-muted-foreground">
            Built with ❤️ significantly faster using{" "}
            <a
              href="https://github.com/viendinhcom/esmate"
              className="font-medium text-foreground underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-primary"
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
