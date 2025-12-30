"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { authServer } from "@/lib/auth";
import { db, orm, schema } from "@/lib/db";
import { invariant } from "@esmate/utils";
import { PostUpdateSchema } from "@/lib/schema";
import z from "zod";

export async function updatePostAction(formData: z.infer<typeof PostUpdateSchema>) {
  const { me, permissions } = await authServer.getAuth({
    permissions: { posts: ["update any", "update own"] },
  });

  const data = PostUpdateSchema.parse(formData);

  const post = await db.query.post.findFirst({
    where: orm.eq(schema.post.id, data.id),
  });

  invariant(post, "Post not found");

  if (permissions.posts.includes("update any")) {
    await db
      .update(schema.post)
      .set({ title: data.title, content: data.content, published: data.published })
      .where(orm.eq(schema.post.id, data.id));
  }

  if (permissions.posts.includes("update own")) {
    await db
      .update(schema.post)
      .set({ title: data.title, content: data.content, published: data.published })
      .where(orm.and(orm.eq(schema.post.authorId, me.id), orm.eq(schema.post.id, data.id)));
  }

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}
