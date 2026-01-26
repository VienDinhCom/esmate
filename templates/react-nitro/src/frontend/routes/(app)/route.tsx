import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { authClient } from "@/frontend/lib/auth";

export const Route = createFileRoute("/(app)")({
  component: RouteComponent,
  async beforeLoad({ location }) {
    const session = await authClient.getSession();

    if (!session.data?.user) {
      const search = new URLSearchParams(location.search);

      throw redirect({
        to: "/auth/sign-in",
        search: {
          callbackUrl: location.pathname + search.toString(),
        },
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
