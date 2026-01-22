import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { getTanStackQueryContext, TanStackQueryProvider } from "@/frontend/config/query";
import "@/frontend/assets/styles/global.css";

import { reportWebVitals } from "@/frontend/config/web-vitals";
import { routeTree } from "@/frontend/config/router";

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

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <TanStackQueryProvider {...queryContext}>
      <RouterProvider router={router} />
    </TanStackQueryProvider>
  </StrictMode>,
);

reportWebVitals();
