"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { authServer } from "@/lib/auth";
import { db, orm, schema } from "@/lib/db";
import { invariant } from "@esmate/utils";
import { PostUpdateSchema } from "@/lib/schema";
import z from "zod";

export async function updatePostAction(formData: z.infer<typeof PostUpdateSchema>) {
  const { me, permissions } = await authServer.verifySession({
    permissions: { posts: ["update any", "update own"] },
  });

  const data = PostUpdateSchema.parse(formData);

  let updated = [];

  if (permissions.posts.includes("update any")) {
    updated = await db
      .update(schema.post)
      .set({ title: data.title, content: data.content, published: data.published })
      .where(orm.eq(schema.post.id, data.id))
      .returning();
  } else {
    updated = await db
      .update(schema.post)
      .set({ title: data.title, content: data.content, published: data.published })
      .where(orm.and(orm.eq(schema.post.authorId, me.id), orm.eq(schema.post.id, data.id)))
      .returning();
  }

  invariant(updated.length > 0, "Post not found or you don't have permission to update it");

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}
