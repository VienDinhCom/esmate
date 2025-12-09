"use client";

import { authClient } from "@/lib/utils";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Input } from "@esmate/shadcn/components/ui/input";
import { Label } from "@esmate/shadcn/components/ui/label";
import { useZodForm } from "@esmate/shadcn/hooks/use-zod-form";
import { Loader2 } from "@esmate/shadcn/pkgs/lucide-react";
import { toast } from "@esmate/shadcn/pkgs/sonner";
import z from "@esmate/shadcn/pkgs/zod";

type Props = {
  name: string;
  email: string;
};

const FormSchema = z.object({
  name: z.string(),
  email: z.string(),
});

export function AccountForm(props: Props) {
  const form = useZodForm({
    schema: FormSchema,
    defaultValues: {
      name: props.name,
      email: props.email,
    },
  });

  const handleSubmit = form.handleSubmit(async ({ name }) => {
    await authClient.updateUser({ name });

    toast.success("Your account has been updated successfully.");
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name" className="mb-2">
          Name
        </Label>
        <Input id="name" type="text" {...form.register("name")} />
      </div>
      <div>
        <Label htmlFor="email" className="mb-2">
          Email
        </Label>
        <Input id="email" type="email" {...form.register("email")} disabled />
      </div>
      <div>
        <Button
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-600"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}
