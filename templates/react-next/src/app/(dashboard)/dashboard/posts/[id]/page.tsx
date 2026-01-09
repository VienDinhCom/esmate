import { notFound } from "next/navigation";
import { authenticate } from "@/lib/services/auth";
import { db, orm, schema } from "@/lib/db";
import { EditPostForm } from "./edit-post-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const auth = await authenticate();
  const { id } = await params;
  const post = await db.query.post.findFirst({ where: orm.eq(schema.post.id, id) });

  if (!post) notFound();

  await auth.authorize({
    posts: [post.authorId === auth.user.id ? "update own" : "update any"],
  });

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="mb-6 text-lg font-medium text-gray-900 lg:text-2xl">Edit Post</h1>
      <EditPostForm values={post} />
    </section>
  );
}
