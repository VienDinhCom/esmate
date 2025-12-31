import { createAuthClient } from "better-auth/react";
import { stripeClient } from "@better-auth/stripe/client";
import { adminClient } from "better-auth/client/plugins";
import { Auth, Options, Permissions, UserRole } from "./config";
import { invariant } from "@esmate/utils";

export const { getSession, admin, useSession } = createAuthClient({
  plugins: [adminClient(), stripeClient({ subscription: true })],
});

async function authenticate<P extends Permissions>(options?: Options): Promise<Omit<Auth<P>, "headers">> {
  const { data: session } = await getSession();

  async function authorize(permissions: P) {
    const permitted = await admin.hasPermission({
      permissions,
    });

    invariant(permitted, "User does not have permission");

    return permissions;
  }

  if (!session) {
    if (options?.callbackUrl) {
      window.location.href = `/auth/sign-in?callbackUrl=${options.callbackUrl}`;
    }

    throw new Error("Not authenticated");
  }

  const user = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role as UserRole,
  };

  invariant(user.role, "User role not found");

  return {
    user,
    authorize,
  };
}

export const authClient = {
  authenticate,
};
