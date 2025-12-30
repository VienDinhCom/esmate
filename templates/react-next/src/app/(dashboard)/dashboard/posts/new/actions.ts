"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { authServer } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { PostInsertSchema } from "@/lib/db/schema";
import z from "zod";

export async function createPostAction(formData: z.infer<typeof PostInsertSchema>) {
  const { me } = await authServer.getAuth({
    permissions: { posts: ["create"] },
  });

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
