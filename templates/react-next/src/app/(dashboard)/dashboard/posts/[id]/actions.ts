"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { authServer } from "@/lib/auth";
import { db, orm, schema } from "@/lib/db";
import { invariant } from "@esmate/utils";
import { PostUpdateSchema } from "@/lib/schema";
import z from "zod";

export async function updatePostAction(formData: z.infer<typeof PostUpdateSchema>) {
  const data = PostUpdateSchema.parse(formData);
  const post = await db.query.post.findFirst({ where: orm.eq(schema.post.id, data.id) });

  invariant(post, "Post not found");

  const { me, authorize } = await authServer.verifySession();

  await authorize({
    posts: [post.authorId === me.id ? "update own" : "update any"],
  });

  await db
    .update(schema.post)
    .set({ title: data.title, content: data.content, published: data.published })
    .where(orm.eq(schema.post.id, data.id));

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}
