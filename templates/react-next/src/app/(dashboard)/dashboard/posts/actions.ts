"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, getAuthOrSignIn } from "@/lib/auth";
import { db, orm, schema } from "@/lib/db";
import { invariant } from "@esmate/utils";

export async function createPostAction(formData: FormData) {
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

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";

  invariant(title, "Title is required");
  invariant(content, "Content is required");

  await db.insert(schema.post).values({
    id: crypto.randomUUID(),
    title,
    content,
    published,
    authorId: me.id,
  });

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}

export async function updatePostAction(formData: FormData) {
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

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";

  invariant(id, "Post ID is required");
  invariant(title, "Title is required");
  invariant(content, "Content is required");

  const post = await db.query.post.findFirst({
    where: orm.eq(schema.post.id, id),
  });

  invariant(post, "Post not found");

  await db.update(schema.post).set({ title, content, published }).where(orm.eq(schema.post.id, id));

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}

export async function deletePostAction(formData: FormData) {
  const me = await getAuthOrSignIn("/dashboard/posts");

  const permission = await auth.api.userHasPermission({
    body: {
      userId: me.id,
      permission: {
        posts: ["delete any", "delete own"],
      },
    },
  });

  invariant(permission.success, "You don't have permission to delete this post");

  const id = formData.get("id") as string;
  invariant(id, "Post ID is required");

  const post = await db.query.post.findFirst({
    where: orm.eq(schema.post.id, id),
  });

  invariant(post, "Post not found");

  await db.delete(schema.post).where(orm.eq(schema.post.id, id));

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}
