import { NewPostForm } from "./new-post-form";
import { authServer } from "@/lib/auth";

export default async function NewPostPage() {
  const auth = await authServer.authenticate();

  await auth.authorize({ posts: ["create"] });

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="mb-6 text-lg font-medium text-gray-900 lg:text-2xl">New Post</h1>
      <NewPostForm />
    </section>
  );
}
