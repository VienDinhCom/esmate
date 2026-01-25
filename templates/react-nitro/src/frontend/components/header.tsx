import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-center px-4">
        <nav className="flex items-center space-x-6 text-base font-medium">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="text-foreground/60 transition-colors hover:text-foreground/80"
            activeProps={{ className: "font-bold text-foreground" }}
          >
            Home
          </Link>
          <Link
            to="/todos"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
            activeProps={{ className: "font-bold text-foreground" }}
          >
            Todos
          </Link>
          <Link
            to="/chat"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
            activeProps={{ className: "font-bold text-foreground" }}
          >
            Chat
          </Link>
        </nav>
      </div>
    </header>
  );
}
