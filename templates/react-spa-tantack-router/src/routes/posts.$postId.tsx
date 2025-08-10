import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'

const postQueryOptions = (postId: string) => ({
  queryKey: ['posts', postId],
  queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(res => res.json()),
})

export const Route = createFileRoute('/posts/$postId')({
  component: Post,
  loader: ({ context: { queryClient }, params: { postId } }) =>
    queryClient.ensureQueryData(postQueryOptions(postId)),
})

function Post() {
  const { postId } = Route.useParams()
  const { data: post } = useSuspenseQuery(postQueryOptions(postId))

  return (
    <div className="p-2">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  )
}
