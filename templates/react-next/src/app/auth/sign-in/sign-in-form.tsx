"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Input } from "@esmate/shadcn/components/ui/input";
import { Label } from "@esmate/shadcn/components/ui/label";
import { useZodForm } from "@esmate/shadcn/hooks/use-zod-form";
import { cn } from "@esmate/shadcn/lib/utils";
import { z } from "@esmate/shadcn/pkgs/zod";

import { authClient } from "@/lib/utils";

const FormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function SignInForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectURL = searchParams.get("redirect") || "/";

  const form = useZodForm({
    schema: FormSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async ({ email, password }) => {
    await authClient.signIn.email({ email, password });

    router.push(redirectURL);
  });

  return (
    <div className={cn("flex w-full max-w-sm flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Log in with your email</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...form.register("email")} placeholder="m@example.com" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" {...form.register("password")} required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Sign In with Google
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href={`/auth/sign-up?redirect=${redirectURL}`} className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
