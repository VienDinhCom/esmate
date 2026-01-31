import type { QueryClient } from "@tanstack/react-query";

import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import Header from "@/components/header";
import { TanStackDevTools } from "@/lib/tanstack";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Outlet />
      </main>
      <TanStackDevTools />
    </div>
  ),
});
