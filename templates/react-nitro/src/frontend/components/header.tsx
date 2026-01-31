import { Button } from "@esmate/shadcn/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";

import { authClient } from "@/frontend/lib/auth";

export default function Header() {
  const session = authClient.useSession();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <nav className="flex items-center gap-1">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            activeProps={{ className: "bg-accent text-accent-foreground" }}
          >
            Home
          </Link>
          <Link
            to="/todos"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            activeProps={{ className: "bg-accent text-accent-foreground" }}
          >
            Todos
          </Link>
          <Link
            to="/chat"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            activeProps={{ className: "bg-accent text-accent-foreground" }}
          >
            Chat
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {session.data?.user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await authClient.signOut();
                navigate({ to: "/" });
              }}
            >
              Sign Out
            </Button>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/auth/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
