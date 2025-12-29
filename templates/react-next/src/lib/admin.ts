import { admin as betterAuthAdmin } from "better-auth/plugins";
import { createAccessControl, Role } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

// https://www.better-auth.com/docs/plugins/admin#access-control

const ac = createAccessControl({
  ...defaultStatements,
  posts: ["create", "read any", "read own", "update any", "update own", "delete any", "delete own"],
});

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
