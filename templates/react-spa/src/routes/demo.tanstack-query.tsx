import { Badge } from "@esmate/shadcn/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Separator } from "@esmate/shadcn/components/ui/separator";
import { Database, RefreshCw, Zap } from "@esmate/shadcn/pkgs/lucide-react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/tanstack-query")({
  component: TanStackQueryDemo,
});

function TanStackQueryDemo() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      new Promise<{ id: number; name: string; role: string }[]>((resolve) =>
        setTimeout(
          () =>
            resolve([
              { id: 1, name: "Alice", role: "Developer" },
              { id: 2, name: "Bob", role: "Designer" },
              { id: 3, name: "Charlie", role: "Product Manager" },
            ]),
          500,
        ),
      ),
    initialData: [],
  });

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">TanStack Query Demo</h1>
              <p className="text-muted-foreground">
                Simple promise handling with automatic caching and background refetching.
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Features */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-medium">Automatic Caching</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Query results are cached and reused across your app.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-medium">Background Refetch</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Stale data is automatically refreshed in the background.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-medium">Optimistic Updates</CardTitle>
              </div>
              <CardDescription className="text-xs">Update UI instantly while syncing with the server.</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Data Card */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/30">
            <div className="flex items-center justify-between">
              <CardTitle>Team Members</CardTitle>
              <div className="flex items-center gap-2">
                {isFetching && (
                  <Badge variant="outline" className="animate-pulse">
                    <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                    Syncing...
                  </Badge>
                )}
                {!isFetching && !isLoading && <Badge variant="secondary">{data.length} members</Badge>}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {data.map((member) => (
                  <li
                    key={member.id}
                    className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
                        {member.name.charAt(0)}
                      </div>
                      <span className="font-medium">{member.name}</span>
                    </div>
                    <Badge variant="outline">{member.role}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Code Example */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">How it works</CardTitle>
            <CardDescription>Just define your query key and function. TanStack Query handles the rest.</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              <code>{`const { data, isLoading } = useQuery({
  queryKey: ["todos"],
  queryFn: () => fetchTodos(),
});`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
