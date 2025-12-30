"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db, orm, schema } from "@/lib/db";
import { invariant } from "@esmate/utils";
import { authServer } from "@/lib/auth";

export async function deletePostAction(formData: FormData) {
  const { me, permissions } = await authServer.verifySession({
    permissions: { posts: ["delete any", "delete own"] },
  });

  const id = formData.get("id") as string;
  invariant(id, "Post ID is required");

  let deleted = [];

  if (permissions.posts.includes("delete any")) {
    deleted = await db.delete(schema.post).where(orm.eq(schema.post.id, id)).returning();
  } else {
    deleted = await db
      .delete(schema.post)
      .where(orm.and(orm.eq(schema.post.id, id), orm.eq(schema.post.authorId, me.id)))
      .returning();
  }

  invariant(deleted.length > 0, "Post not found or you don't have permission to delete it");

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}
