import { useImmerState } from "@esmate/react/hooks";
import { Alert, AlertDescription } from "@esmate/shadcn/components/ui/alert";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Input } from "@esmate/shadcn/components/ui/input";
import { Label } from "@esmate/shadcn/components/ui/label";
import { useZodForm } from "@esmate/shadcn/hooks/use-zod-form";
import { z } from "@esmate/shadcn/pkgs/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { authClient } from "@/frontend/lib/auth";

const FormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const Route = createFileRoute("/auth/sign-in")({
  component: RouteComponent,
  validateSearch: z.object({
    callbackUrl: z.string().optional(),
  }),
});

interface State {
  error: string | null;
}

function RouteComponent() {
  const [state, setState] = useImmerState<State>({
    error: null,
  });
  const navigate = useNavigate();
  const search = Route.useSearch();
  const form = useZodForm({
    schema: FormSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await authClient.signIn.email(values, {
      onError: (ctx) => {
        setState((draft) => {
          draft.error = ctx.error.message;
          return draft;
        });
      },
      onSuccess: () => {
        navigate({ to: search.callbackUrl || "/" });
      },
    });
  });

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Enter your email and password to sign in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@example.com" {...form.register("email")} />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...form.register("password")} />
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
            )}
          </div>
          <Button className="w-full" onClick={handleSubmit} disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
          {state.error && (
            <Alert variant="destructive">
              <AlertDescription>Email or password is incorrect.</AlertDescription>
            </Alert>
          )}
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/auth/sign-up"
              search={{ callbackUrl: search.callbackUrl || "/" }}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
