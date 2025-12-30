import { notFound } from "next/navigation";
import { authServer } from "@/lib/auth";
import { db, orm, schema } from "@/lib/db";
import { EditPostForm } from "./edit-post-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const { me, permissions } = await authServer.getAuth({
    permissions: { posts: ["update any", "update own"] },
  });

  const { id } = await params;

  const post = permissions?.posts.includes("update any")
    ? await db.query.post.findFirst({
        where: orm.eq(schema.post.id, id),
      })
    : await db.query.post.findFirst({
        where: orm.and(orm.eq(schema.post.id, id), orm.eq(schema.post.authorId, me.id)),
      });

  if (!post) notFound();

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="mb-6 text-lg font-medium text-gray-900 lg:text-2xl">Edit Post</h1>
      <EditPostForm values={post} />
    </section>
  );
}
