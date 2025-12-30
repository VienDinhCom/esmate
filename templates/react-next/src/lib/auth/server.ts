import { db, orm, schema } from "@/lib/db";
import { invariant } from "@esmate/utils";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth, RBAC, Auth, Options, Permissions, UserRole } from "./config";
import { intersection } from "@esmate/utils";

async function getAuth<P extends Permissions>(options?: Options<P>): Promise<Auth<P>> {
  let me: Auth<P>["me"];
  const permissions: Record<string, string[]> = {};

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
      if (options?.sign === "in") {
        redirect(`/auth/sign-in${options.redirect ? `?redirect=${options.redirect}` : ""}`);
      }

      if (options?.sign === "up") {
        redirect(`/auth/sign-up${options.redirect ? `?redirect=${options.redirect}` : ""}`);
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

  // if permissions are required, check if the user has them
  if (options?.permissions) {
    for (const [resource, requestedActions] of Object.entries(options?.permissions)) {
      const roleActions = RBAC.roles[me.role].statements[resource];

      permissions[resource] = intersection(roleActions, requestedActions);
    }

    const permitted = await auth.api.userHasPermission({
      body: {
        userId: me.id,
        role: me.role,
        permissions,
      },
    });

    invariant(permitted.success, "User does not have permission");
  }

  return {
    me: me,
    permissions: permissions as P,
  };
}

export const authServer = {
  getAuth,
};
