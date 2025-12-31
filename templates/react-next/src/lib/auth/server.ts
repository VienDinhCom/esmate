import { db, orm, schema } from "@/lib/db";
import { invariant } from "@esmate/utils";
import { redirect } from "next/navigation";
import { headers as getHeaders } from "next/headers";
import { auth, Auth, Options, Permissions, UserRole } from "./config";
import { BetterBody } from "@/lib/types";

async function authenticate<P extends Permissions>(options?: Options): Promise<Auth<P>> {
  let user: Auth<P>["user"];
  const headers = await getHeaders();

  async function authorize(permissions: P) {
    const permitted = await auth.api.userHasPermission({
      body: {
        permissions,
        userId: user.id,
        role: user.role,
      },
    });

    invariant(permitted.success, "User does not have permission");

    return permissions;
  }

  if (options?.id) {
    const data = await db.query.user.findFirst({ where: orm.eq(schema.user.id, options.id) });

    invariant(data, "User not found");

    user = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role as UserRole,
    };
  } else {
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
    authorize,
  };
}

export async function createBillingPortal(options: BetterBody<typeof auth.api.createBillingPortal>) {
  const res = await auth.api.createBillingPortal({
    body: options,
    headers: await getHeaders(),
  });

  return res;
}

export async function upgradeSubscription(options: BetterBody<typeof auth.api.upgradeSubscription>) {
  const res = await auth.api.upgradeSubscription({
    body: options,
    headers: await getHeaders(),
  });

  return res;
}

export const authServer = {
  authenticate,
  createBillingPortal,
  upgradeSubscription,
};
