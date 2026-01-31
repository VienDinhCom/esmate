import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@esmate/shadcn/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-xl items-center px-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                className="rounded-md border px-4 py-2"
                to="/"
                activeProps={{
                  className: "font-bold",
                }}
              >
                Home
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                className="rounded-md border px-4 py-2"
                to="/demo/tanstack-query"
                activeProps={{
                  className: "font-bold",
                }}
              >
                TanStack Query
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
