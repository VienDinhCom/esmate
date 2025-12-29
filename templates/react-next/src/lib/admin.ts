import { admin as betterAuthAdmin } from "better-auth/plugins";
import { createAccessControl, Role } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";
import { auth, getAuthOrThrow } from "./auth";
import { intersection } from "@esmate/utils";

// https://www.better-auth.com/docs/plugins/admin#access-control

const statements = {
  ...defaultStatements,
  posts: ["create", "read any", "read own", "update any", "update own", "delete any", "delete own"],
} as const;

const ac = createAccessControl(statements);

const roles: Record<string, Role> = {
  user: ac.newRole({
    posts: ["create", "read own", "update own", "delete own"],
  }),
  admin: ac.newRole({
    posts: ["create", "read any", "read own", "update any", "update own", "delete any", "delete own"],
    ...adminAc.statements,
  }),
};

export type UserRole = "user" | "admin";

export const adminPlugin = betterAuthAdmin({ ac, roles, defaultRole: "user", adminRoles: ["admin"] });

type PermissionQuery = {
  [R in keyof typeof statements]?: (typeof statements)[R][number][];
};

export async function userHasAnyPermission<P extends PermissionQuery>(userId: string, permissions: P) {
  const me = await getAuthOrThrow();
  const allowedPermissions: Record<string, string[]> = {};

  for (const [resource, requestedActions] of Object.entries(permissions)) {
    const roleActions = roles[me.role].statements[resource];

    allowedPermissions[resource] = intersection(roleActions, requestedActions);
  }

  console.log("allowedPermissions", allowedPermissions);

  const result = await auth.api.userHasPermission({
    body: {
      userId: me.id,
      role: me.role,
      permissions: allowedPermissions,
    },
  });

  if (result.error) throw result.error;

  console.log("result", result);

  return {
    me,
    permitted: result.success,
    permissions: allowedPermissions as P,
  };
}
