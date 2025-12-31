import { createAuthClient } from "better-auth/react";
import { stripeClient } from "@better-auth/stripe/client";
import { adminClient } from "better-auth/client/plugins";
import { Auth, Options, Permissions, UserRole } from "./config";
import { invariant } from "@esmate/utils";

const { getSession, admin } = createAuthClient({
  plugins: [adminClient(), stripeClient({ subscription: true })],
});

async function authenticate<P extends Permissions>(options?: Options): Promise<Omit<Auth<P>, "headers">> {
  let user: Auth<P>["user"];

  // if (options?.id) {
  //   user = {
  //   };
  // } else

  {
    const { data: session } = await getSession();

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

  const authorize = async (permissions: P) => {
    const permitted = admin.hasPermission({
      permissions,
    });

    invariant(permitted, "User does not have permission");

    return permissions;
  };

  return {
    user,
    authorize,
  };
}

export const authClient = {
  authenticate,
};
