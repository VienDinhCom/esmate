import type { QueryClient } from "@tanstack/react-query";

import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import Header from "@/frontend/components/header";
import { TanStackDevTools } from "@/frontend/lib/tanstack";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Header />
      <Outlet />
      <TanStackDevTools />
    </>
  ),
});
