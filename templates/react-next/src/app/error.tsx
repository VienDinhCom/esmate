"use client";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@esmate/shadcn/components/ui/alert";
import { Button } from "@esmate/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@esmate/shadcn/components/ui/card";
import { AlertCircle, RefreshCw } from "@esmate/shadcn/pkgs/lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="mb-2 flex justify-center">
            <div className="rounded-full bg-red-100 p-3">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Something went wrong!</CardTitle>
          <CardDescription>We encountered an unexpected error. Don&apos;t worry, you can try again.</CardDescription>
        </CardHeader>

        <CardContent>
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Details</AlertTitle>
            <AlertDescription className="mt-2 font-mono text-sm wrap-break-word">
              {error.message || "An unknown error occurred"}
            </AlertDescription>
            {error.digest && (
              <AlertDescription className="mt-2 text-xs opacity-70">Error ID: {error.digest}</AlertDescription>
            )}
          </Alert>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button onClick={() => reset()} className="w-full" size="lg">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button variant="outline" className="w-full" onClick={() => router.replace("/")}>
            Go to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
