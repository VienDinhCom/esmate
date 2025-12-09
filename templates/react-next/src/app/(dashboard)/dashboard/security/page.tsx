"use client";

import { Button } from "@esmate/shadcn/components/ui/button";
import { Input } from "@esmate/shadcn/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Label } from "@esmate/shadcn/components/ui/label";
import { useZodForm } from "@esmate/shadcn/hooks/use-zod-form";
import z from "@esmate/shadcn/pkgs/zod";
import { toast } from "@esmate/shadcn/pkgs/sonner";
import { authClient } from "@/lib/utils";
import { Loader2, Lock, Trash2 } from "@esmate/shadcn/pkgs/lucide-react";
import { redirect } from "next/navigation";

const PasswordSchema = z
  .object({
    currentPassword: z.string({ message: "Current password is required" }),
    newPassword: z.string({ message: "New password is required" }),
    confirmPassword: z.string({ message: "Confirm password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password must match",
    path: ["confirmPassword"], // Associates the error with the confirmPassword field
  });

const DeleteSchema = z.object({
  password: z.string({ message: "Password is required" }),
});

export default function SecurityPage() {
  const passwordForm = useZodForm({
    schema: PasswordSchema,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const deleteForm = useZodForm({
    schema: DeleteSchema,
    defaultValues: {
      password: "",
    },
  });

  const changePasswordSubmit = passwordForm.handleSubmit(async ({ currentPassword, newPassword }) => {
    await authClient.changePassword({ currentPassword, newPassword });
    toast.success("Your password has been changed successfully.");
  });

  const deleteSubmit = deleteForm.handleSubmit(async ({ password }) => {
    await authClient.deleteUser({ password });
    toast.success("Your account has been deleted successfully.");
    redirect("/");
  });

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="bold mb-6 text-lg font-medium text-gray-900 lg:text-2xl">Security Settings</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={changePasswordSubmit}>
            <div>
              <Label htmlFor="current-password" className="mb-2">
                Current Password
              </Label>
              <Input id="current-password" type="password" {...passwordForm.register("currentPassword")} />
            </div>
            <div>
              <Label htmlFor="new-password" className="mb-2">
                New Password
              </Label>
              <Input id="new-password" type="password" {...passwordForm.register("newPassword")} />
            </div>
            <div>
              <Label htmlFor="confirm-password" className="mb-2">
                Confirm New Password
              </Label>
              <Input id="confirm-password" type="password" {...passwordForm.register("confirmPassword")} />
            </div>
            <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
              {passwordForm.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Update Password
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-gray-500">Account deletion is non-reversable. Please proceed with caution.</p>
          <form className="space-y-4" onSubmit={deleteSubmit}>
            <div>
              <Label htmlFor="delete-password" className="mb-2">
                Confirm Password
              </Label>
              <Input id="delete-password" type="password" {...deleteForm.register("password")} />
            </div>
            <Button
              type="submit"
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteForm.formState.isSubmitting}
            >
              {deleteForm.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
