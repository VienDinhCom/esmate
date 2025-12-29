"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, getAuthOrSignIn } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { invariant } from "@esmate/utils";
import { PostInsertSchema } from "@/lib/db/schema";
import z from "zod";

export async function createPostAction(formData: z.infer<typeof PostInsertSchema>) {
  const me = await getAuthOrSignIn("/dashboard/posts/new");

  const permission = await auth.api.userHasPermission({
    body: {
      userId: me.id,
      permission: {
        posts: ["create"],
      },
    },
  });

  invariant(permission.success, "You don't have permission to create a post");

  const data = PostInsertSchema.parse(formData);

  await db.insert(schema.post).values({
    id: crypto.randomUUID(),
    title: data.title,
    content: data.content,
    published: data.published,
    authorId: me.id,
  });

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}
