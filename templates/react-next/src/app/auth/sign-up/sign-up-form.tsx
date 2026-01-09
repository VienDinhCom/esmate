"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription } from "@esmate/shadcn/components/ui/alert";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Input } from "@esmate/shadcn/components/ui/input";
import { Label } from "@esmate/shadcn/components/ui/label";
import { Spinner } from "@esmate/shadcn/components/ui/spinner";
import { useZodForm } from "@esmate/shadcn/hooks/use-zod-form";
import { cn } from "@esmate/shadcn/lib/utils";
import { z } from "@esmate/shadcn/pkgs/zod";

import { authClient } from "@/lib/utils";

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function SignUpForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParam = useSearchParams();
  const redirectURL = searchParam.get("redirect") || "/";
  const [error, setError] = useState<string | null>(null);
  const form = useZodForm({
    schema: FormSchema,
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async ({ email, name, password }) => {
    setError(null);

    await authClient.signUp.email(
      { name, email, password },
      {
        onSuccess: () => {
          router.push(redirectURL);
        },
        onError: (ctx) => {
          setError(ctx.error.message || "Something went wrong. Please try again.");
        },
      },
    );
  });

  return (
    <div className={cn("flex w-full max-w-sm flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create account with your email.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" {...form.register("name")} placeholder="Enter your name" />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...form.register("email")} placeholder="Enter your email" />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" {...form.register("password")} placeholder="Enter your password" />
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? <Spinner className="mr-2 h-4 w-4" /> : null}
                  Sign Up
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Sign In with Google
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Have an account?{" "}
              <a href={`/auth/sign-in?redirect=${redirectURL}`} className="underline underline-offset-4">
                Sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
