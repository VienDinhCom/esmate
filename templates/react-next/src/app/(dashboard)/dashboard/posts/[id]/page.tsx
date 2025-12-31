import { notFound } from "next/navigation";
import { authServer } from "@/lib/auth";
import { db, orm, schema } from "@/lib/db";
import { EditPostForm } from "./edit-post-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const { me, authorize } = await authServer.authenticate();

  const { id } = await params;

  const post = await db.query.post.findFirst({ where: orm.eq(schema.post.id, id) });

  if (!post) notFound();

  await authorize({
    posts: [post.authorId === me.id ? "update own" : "update any"],
  });

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="mb-6 text-lg font-medium text-gray-900 lg:text-2xl">Edit Post</h1>
      <EditPostForm values={post} />
    </section>
  );
}
