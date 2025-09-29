import { StrictMode } from "react";
import { getTanStackQueryContext, TanStackQueryProvider } from "./config/query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./config/router";

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

export const TanStackSinglePageApp = () => (
  <StrictMode>
    <TanStackQueryProvider {...queryContext}>
      <RouterProvider router={router} />
    </TanStackQueryProvider>
  </StrictMode>
);
