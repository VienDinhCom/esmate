import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackDevTools } from "@shared/integrations/tanstack-devtools/devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackDevTools />
    </>
  ),
});
