"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { userHasAnyPermission } from "@/lib/admin";
import { db, orm, schema } from "@/lib/db";
import { invariant } from "@esmate/utils";

export async function deletePostAction(formData: FormData) {
  const { me, permitted, permissions } = await userHasAnyPermission("", {
    posts: ["delete any", "delete own"],
  });

  invariant(permitted, "You don't have permission to delete this post");

  const id = formData.get("id") as string;
  invariant(id, "Post ID is required");

  if (permissions.posts?.includes("delete own")) {
    await db.delete(schema.post).where(orm.and(orm.eq(schema.post.id, id), orm.eq(schema.post.authorId, me.id)));
  }

  if (permissions.posts?.includes("delete any")) {
    await db.delete(schema.post).where(orm.eq(schema.post.id, id));
  }

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}
