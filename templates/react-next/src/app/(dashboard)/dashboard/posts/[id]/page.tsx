import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db, orm, schema } from "@/lib/db";
import { EditPostForm } from "./edit-post-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(`/auth/sign-in?redirect=/dashboard/posts/${id}`);
  }

  const post = await db.query.post.findFirst({
    where: orm.eq(schema.post.id, id),
  });

  if (!post) {
    notFound();
  }

  // Check authorization: must be owner or admin
  const isOwner = post.authorId === session.user.id;
  const isAdmin = session.user.role === "admin";

  if (!isOwner && !isAdmin) {
    redirect("/dashboard/posts");
  }

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="mb-6 text-lg font-medium text-gray-900 lg:text-2xl">Edit Post</h1>
      <EditPostForm id={post.id} title={post.title} content={post.content} published={post.published} />
    </section>
  );
}
