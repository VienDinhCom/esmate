"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { Button } from "@esmate/shadcn/components/ui/button";
import { CircleIcon, Home, LogOut } from "@esmate/shadcn/pkgs/lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@esmate/shadcn/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@esmate/shadcn/components/ui/avatar";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/utils";

interface User {
  id: string;
  email: string;
  name: string;
  image?: string | null | undefined;
}

function UserMenu(props: { user: User | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/");
  }

  if (!props.user) {
    return (
      <>
        <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-gray-900">
          Pricing
        </Link>
        <Button asChild className="rounded-full">
          <Link href="/auth/sign-up">Sign Up</Link>
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="size-9 cursor-pointer">
          <AvatarImage alt={props.user.name || ""} />
          <AvatarFallback>
            {props.user.email
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
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

export function Header(props: { user: User | null }) {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <CircleIcon className="h-6 w-6 text-blue-500" />
          <span className="ml-2 text-xl font-semibold text-gray-900">ESMate</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Suspense fallback={<div className="h-9" />}>
            <UserMenu user={props.user} />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
