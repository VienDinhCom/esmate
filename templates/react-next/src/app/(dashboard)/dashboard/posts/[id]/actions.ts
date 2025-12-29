"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, getAuthOrSignIn } from "@/lib/auth";
import { db, orm, schema } from "@/lib/db";
import { invariant } from "@esmate/utils";
import { PostUpdateSchema } from "@/lib/db/schema";
import z from "zod";

export async function updatePostAction(formData: z.infer<typeof PostUpdateSchema>) {
  const me = await getAuthOrSignIn("/dashboard/posts");

  const permission = await auth.api.userHasPermission({
    body: {
      userId: me.id,
      permission: {
        posts: ["update any", "update own"],
      },
    },
  });

  invariant(permission.success, "You don't have permission to update this post");

  const data = PostUpdateSchema.parse(formData);

  const post = await db.query.post.findFirst({
    where: orm.eq(schema.post.id, data.id!),
  });

  invariant(post, "Post not found");

  await db
    .update(schema.post)
    .set({ title: data.title, content: data.content, published: data.published })
    .where(orm.eq(schema.post.id, data.id!));

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}
