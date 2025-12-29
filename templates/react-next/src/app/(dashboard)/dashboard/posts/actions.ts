"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db, orm, schema } from "@/lib/db";

function generateId(): string {
  return crypto.randomUUID();
}

export async function createPostAction(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/auth/sign-in?redirect=/dashboard/posts/new");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  await db.insert(schema.post).values({
    id: generateId(),
    title,
    content,
    published,
    authorId: session.user.id,
  });

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}

export async function updatePostAction(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/auth/sign-in");
  }

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "on";

  if (!id || !title || !content) {
    throw new Error("ID, title and content are required");
  }

  // Get the post to check ownership
  const post = await db.query.post.findFirst({
    where: orm.eq(schema.post.id, id),
  });

  if (!post) {
    throw new Error("Post not found");
  }

  // Check authorization: must be owner or admin
  const isOwner = post.authorId === session.user.id;
  const isAdmin = session.user.role === "admin";

  if (!isOwner && !isAdmin) {
    throw new Error("You don't have permission to update this post");
  }

  await db.update(schema.post).set({ title, content, published }).where(orm.eq(schema.post.id, id));

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}

export async function deletePostAction(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/auth/sign-in");
  }

  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Post ID is required");
  }

  // Get the post to check ownership
  const post = await db.query.post.findFirst({
    where: orm.eq(schema.post.id, id),
  });

  if (!post) {
    throw new Error("Post not found");
  }

  // Check authorization: must be owner or admin
  const isOwner = post.authorId === session.user.id;
  const isAdmin = session.user.role === "admin";

  if (!isOwner && !isAdmin) {
    throw new Error("You don't have permission to delete this post");
  }

  await db.delete(schema.post).where(orm.eq(schema.post.id, id));

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}
