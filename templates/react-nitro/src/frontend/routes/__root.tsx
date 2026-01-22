import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface RouterContext {}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
