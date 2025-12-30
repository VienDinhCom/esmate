import Link from "next/link";
import { db, orm, schema } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Badge } from "@esmate/shadcn/components/ui/badge";
import { Plus, Pencil } from "@esmate/shadcn/pkgs/lucide-react";
import { deletePostAction } from "./actions";
import { authServer } from "@/lib/auth";

export default async function PostsPage() {
  const { me, permissions } = await authServer.getAuth({
    sign: "in",
    permissions: {
      posts: ["read any", "read own"],
    },
  });

  const posts = permissions.posts.includes("read any")
    ? await db.query.post.findMany({
        orderBy: orm.desc(schema.post.createdAt),
        with: { author: true },
      })
    : await db.query.post.findMany({
        where: orm.eq(schema.post.authorId, me.id),
        orderBy: orm.desc(schema.post.createdAt),
        with: { author: true },
      });

  return (
    <section className="flex-1 p-4 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-medium text-gray-900 lg:text-2xl">Posts</h1>
        <Link href="/dashboard/posts/new">
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">No posts yet. Create your first post!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    {me.role === "admin" && <p className="mt-1 text-sm text-gray-500">By {post.author.name}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 line-clamp-2 text-gray-600">{post.content}</p>
                <div className="flex gap-2">
                  <Link href={`/dashboard/posts/${post.id}`}>
                    <Button variant="outline" size="sm">
                      <Pencil className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                  </Link>
                  <form action={deletePostAction}>
                    <input type="hidden" name="id" value={post.id} />
                    <Button type="submit" variant="destructive" size="sm">
                      Delete
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
