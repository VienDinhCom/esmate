import type { QueryClient } from "@tanstack/react-query";

import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import Header from "@/frontend/components/header";
import { TanStackDevTools } from "@/frontend/lib/tanstack";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <TanStackDevTools />
    </div>
  ),
});
