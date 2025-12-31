import { db, orm, schema } from "@/lib/db";
import { invariant } from "@esmate/utils";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth, Auth, Options, Permissions, UserRole } from "./config";
import { ExtractBody } from "@/lib/types";

async function verifySession<P extends Permissions>(options?: Options): Promise<Auth<P>> {
  let me: Auth<P>["me"];

  if (options?.id) {
    const user = await db.query.user.findFirst({ where: orm.eq(schema.user.id, options.id) });

    invariant(user, "User not found");

    me = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
    };
  } else {
    const session = await auth.api.getSession({ headers: await headers() });

    if (session === null) {
      if (options?.callbackUrl) {
        redirect(`/auth/sign-in?callbackUrl=${options.callbackUrl}`);
      }

      throw new Error("Not authenticated");
    }

    me = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role as UserRole,
    };
  }

  invariant(me.role, "User role not found");

  async function authorize(permissions: P) {
    const permitted = await auth.api.userHasPermission({
      body: {
        permissions,
        userId: me.id,
        role: me.role,
      },
    });

    invariant(permitted.success, "User does not have permission");

    return permissions;
  }

  return {
    me,
    authorize,
  };
}

export async function createBillingPortal(options: ExtractBody<typeof auth.api.createBillingPortal>) {
  const res = await auth.api.createBillingPortal({
    body: options,
    headers: await headers(),
  });

  return res;
}

export async function upgradeSubscription(options: ExtractBody<typeof auth.api.upgradeSubscription>) {
  const res = await auth.api.upgradeSubscription({
    body: options,
    headers: await headers(),
  });

  return res;
}

export const authServer = {
  verifySession,
  createBillingPortal,
  upgradeSubscription,
};
