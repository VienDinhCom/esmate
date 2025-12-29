import { NewPostForm } from "./new-post-form";

export default function NewPostPage() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="mb-6 text-lg font-medium text-gray-900 lg:text-2xl">New Post</h1>
      <NewPostForm />
    </section>
  );
}
