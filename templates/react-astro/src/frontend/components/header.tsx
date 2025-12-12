import { Avatar, AvatarFallback, AvatarImage } from "@esmate/shadcn/components/ui/avatar";
import { Button } from "@esmate/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@esmate/shadcn/components/ui/dropdown-menu";
import { CircleIcon, Home, LogOut } from "@esmate/shadcn/pkgs/lucide-react";
import { useState } from "react";

import { auth } from "@frontend/utils/auth";

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = auth.useSession();

  const user = session.data?.user;

  async function handleSignOut() {
    await auth.signOut();
    window.location.href = "/";
  }

  if (!user) {
    return (
      <>
        <Button asChild className="rounded-full">
          <a href="/auth/sign-up?redirect=/">Sign Up</a>
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="size-9 cursor-pointer">
          <AvatarImage alt={user.name || ""} />
          <AvatarFallback>
            {user.email
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem className="cursor-pointer">
          <a href="/dashboard" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </a>
        </DropdownMenuItem>
        <form action={handleSignOut} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="w-full flex-1 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center">
          <CircleIcon className="h-6 w-6 text-blue-500" />
          <span className="ml-2 text-xl font-semibold text-gray-900">ESMate</span>
        </a>
        <div className="flex items-center space-x-4">
          <a href="/blog" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Blog
          </a>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
