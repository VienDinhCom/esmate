import { createAuthClient } from "better-auth/react";
import { stripeClient } from "@better-auth/stripe/client";
import { adminClient } from "better-auth/client/plugins";
import { Auth, Options, Permissions, UserRole } from "./config";
import { invariant } from "@esmate/utils";

const client = createAuthClient({
  plugins: [adminClient(), stripeClient({ subscription: true })],
});

async function authorize<P extends Permissions>(options: { id: string; permissions: P }) {
  const permitted = await client.admin.hasPermission({
    userId: options.id,
    permissions: options.permissions,
  });

  invariant(permitted.data?.success, "User does not have permission");

  return options.permissions;
}

async function authenticate<P extends Permissions>(options?: Options): Promise<Omit<Auth<P>, "headers">> {
  let user: Auth<P>["user"];

  {
    const { data: session } = await client.getSession();

    if (!session) {
      if (options?.callbackUrl) {
        window.location.href = `/auth/sign-in?callbackUrl=${options.callbackUrl}`;
      }

      throw new Error("Not authenticated");
    }

    user = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role as UserRole,
    };
  }

  invariant(user?.role, "User role not found");

  return {
    user,
    authorize: (permissions: P) => authorize({ id: user.id, permissions }),
  };
}

export const authClient = {
  authorize,
  authenticate,
};
