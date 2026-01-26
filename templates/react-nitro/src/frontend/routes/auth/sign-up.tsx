import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Input } from "@esmate/shadcn/components/ui/input";
import { Label } from "@esmate/shadcn/components/ui/label";
import { useZodForm } from "@esmate/shadcn/hooks/use-zod-form";
import { z } from "@esmate/shadcn/pkgs/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { authClient } from "@/frontend/lib/auth";

const FormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const Route = createFileRoute("/auth/sign-up")({
  component: RouteComponent,
  validateSearch: z.object({
    callbackUrl: z.string().optional(),
  }),
});

function RouteComponent() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const form = useZodForm({
    schema: FormSchema,
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    authClient.signUp.email(values, {
      onSuccess: () => {
        navigate({ to: search.callbackUrl || "/" });
      },
      onError: (ctx) => {
        console.error(ctx.error);
      },
    });
  });

  return (
    <div className="flex items-center justify-center bg-slate-50 p-4 pt-10">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@example.com" {...form.register("email")} />
            {form.formState.errors.email && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...form.register("password")} />
            {form.formState.errors.password && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.password.message}</p>
            )}
          </div>
          <Button className="w-full" onClick={handleSubmit} disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creating account..." : "Sign Up"}
          </Button>
          <div className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/auth/sign-in"
              search={{
                callbackUrl: search.callbackUrl || "/",
              }}
              className="font-semibold text-primary hover:underline"
            >
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
