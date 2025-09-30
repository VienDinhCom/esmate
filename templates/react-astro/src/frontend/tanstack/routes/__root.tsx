import { createRootRoute, Outlet } from "@tanstack/react-router";

import { TanStackDevTools } from "../config/devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackDevTools />
    </>
  ),
});
