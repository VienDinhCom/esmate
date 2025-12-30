"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db, orm, schema } from "@/lib/db";
import { invariant } from "@esmate/utils";
import { authServer } from "@/lib/auth";

export async function deletePostAction(formData: FormData) {
  const { me, permissions } = await authServer.getAuth({
    permissions: { posts: ["delete any", "delete own"] },
  });

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
