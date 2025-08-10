import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

const postsQueryOptions = {
  queryKey: ["posts"],
  queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts").then((res) => res.json()),
};

export const Route = createLazyFileRoute("/posts")({
  component: Posts,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(postsQueryOptions),
});

function Posts() {
  const { data: posts } = useSuspenseQuery(postsQueryOptions);

  return (
    <div className="p-2">
      <h3>Posts</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to="/posts/$postId" params={{ postId: post.id }}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
