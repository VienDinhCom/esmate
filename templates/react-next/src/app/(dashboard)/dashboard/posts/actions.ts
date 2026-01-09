"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db, orm, schema } from "@/lib/db";
import { invariant } from "@esmate/utils";
import { authenticate } from "@/lib/services/auth";

export async function deletePostAction(formData: FormData) {
  const auth = await authenticate();

  const id = formData.get("id") as string;
  invariant(id, "Post ID is required");

  const post = await db.query.post.findFirst({ where: orm.eq(schema.post.id, id) });
  invariant(post, "Post not found");

  await auth.authorize({
    posts: [post.authorId === auth.user.id ? "delete own" : "delete any"],
  });

  await db.delete(schema.post).where(orm.eq(schema.post.id, id));

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}
