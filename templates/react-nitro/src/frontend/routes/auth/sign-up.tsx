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
  email: z.string().email("Invalid email"),
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
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" {...form.register("name")} />
            {form.formState.errors.name && <p>{form.formState.errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@example.com" {...form.register("email")} />
            {form.formState.errors.email && <p>{form.formState.errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...form.register("password")} />
            {form.formState.errors.password && <p>{form.formState.errors.password.message}</p>}
          </div>
          <Button onClick={handleSubmit} disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creating account..." : "Sign Up"}
          </Button>
          <div>
            Already have an account?{" "}
            <Link
              to="/auth/sign-in"
              search={{
                callbackUrl: search.callbackUrl || "/",
              }}
              className=""
            >
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
