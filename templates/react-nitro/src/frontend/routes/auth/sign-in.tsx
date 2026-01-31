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
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your email and password to sign in</CardDescription>
        </CardHeader>
        <CardContent>
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
            {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
          {state.error && (
            <Alert variant="destructive">
              <AlertDescription>Email or password is incorrect.</AlertDescription>
            </Alert>
          )}
          <div>
            Don't have an account?{" "}
            <Link to="/auth/sign-up" search={{ callbackUrl: search.callbackUrl || "/" }} className="">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
