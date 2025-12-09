import Link from "next/link";
import { CircleIcon } from "@esmate/shadcn/pkgs/lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center">
      <div className="max-w-md space-y-8 p-4 text-center">
        <div className="flex justify-center">
          <CircleIcon className="size-12 text-blue-500" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Page Not Found</h1>
        <p className="text-base text-gray-500">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="mx-auto flex max-w-48 justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
