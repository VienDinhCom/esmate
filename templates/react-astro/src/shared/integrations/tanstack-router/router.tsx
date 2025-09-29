import { StrictMode } from "react";
import { getTanStackQueryContext, TanStackQueryProvider } from "@shared/integrations/tanstack-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./route-tree.gen";

const queryContext = getTanStackQueryContext();

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  defaultStructuralSharing: true,
  context: { ...queryContext },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const TanStackRouter = () => (
  <StrictMode>
    <TanStackQueryProvider {...queryContext}>
      <RouterProvider router={router} />
    </TanStackQueryProvider>
  </StrictMode>
);
