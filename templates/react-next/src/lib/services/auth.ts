"use server";

import { invariant } from "@esmate/utils";
import { redirect } from "next/navigation";
import { headers as getHeaders } from "next/headers";
import { auth, Auth, AuthUser, Options, Permissions, UserRole } from "../config/auth";

export async function authorize<P extends Permissions>(options: { id: string; headers?: Headers; permissions: P }) {
  const headers = options.headers ?? (await getHeaders());

  const permitted = await auth.api.userHasPermission({
    body: {
      userId: options.id,
      permissions: options.permissions,
    },
    headers,
  });

  invariant(permitted.success, "User does not have permission");

  return options.permissions;
}

export async function authenticate<P extends Permissions>(options?: Options): Promise<Auth<P>> {
  let user: Auth<P>["user"];
  const headers = await getHeaders();

  {
    const session = await auth.api.getSession({ headers });

    if (session === null) {
      if (options?.callbackUrl) {
        redirect(`/auth/sign-in?callbackUrl=${options.callbackUrl}`);
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

  invariant(user.role, "User role not found");

  return {
    user,
    headers,
    authorize: (permissions: P) => authorize({ id: user.id, headers, permissions }),
  };
}

export async function getAuthUser(): Promise<AuthUser | null> {
  const headers = await getHeaders();
  const session = await auth.api.getSession({ headers });

  if (session === null) {
    return null;
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role as UserRole,
  };
}
