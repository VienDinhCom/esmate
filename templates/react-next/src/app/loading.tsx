import { Loader2 } from "@esmate/shadcn/pkgs/lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-full bg-blue-100/50" />
          <Loader2 className="relative h-12 w-12 animate-spin text-blue-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900">Loading</h2>
          <p className="text-sm text-gray-500">Please wait while we prepare your content...</p>
        </div>
      </div>
    </div>
  );
}
