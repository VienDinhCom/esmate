"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db, orm, schema } from "@/lib/db";
import { invariant } from "@esmate/utils";
import { authServer } from "@/lib/auth";

export async function deletePostAction(formData: FormData) {
  const id = formData.get("id") as string;

  invariant(id, "Post ID is required");

  const post = await db.query.post.findFirst({ where: orm.eq(schema.post.id, id) });

  invariant(post, "Post not found");

  const { me, authorize } = await authServer.verifySession();

  await authorize({
    posts: [post.authorId === me.id ? "delete own" : "delete any"],
  });

  await db.delete(schema.post).where(orm.eq(schema.post.id, id));

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}
