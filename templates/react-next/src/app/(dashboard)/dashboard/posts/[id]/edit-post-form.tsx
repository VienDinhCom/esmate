"use client";

import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Checkbox } from "@esmate/shadcn/components/ui/checkbox";
import { Input } from "@esmate/shadcn/components/ui/input";
import { Label } from "@esmate/shadcn/components/ui/label";
import { Textarea } from "@esmate/shadcn/components/ui/textarea";
import { useZodForm } from "@esmate/shadcn/hooks/use-zod-form";
import { Loader2 } from "@esmate/shadcn/pkgs/lucide-react";
import z from "@esmate/shadcn/pkgs/zod";
import { updatePostAction } from "../actions";

const FormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  published: z.boolean().default(false),
});

type Props = {
  id: string;
  title: string;
  content: string;
  published: boolean;
};

export function EditPostForm({ id, title, content, published }: Props) {
  const form = useZodForm({
    schema: FormSchema,
    defaultValues: {
      title,
      content,
      published,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={updatePostAction} className="space-y-4">
          <input type="hidden" name="id" value={id} />

          <div>
            <Label htmlFor="title" className="mb-2">
              Title
            </Label>
            <Input id="title" type="text" {...form.register("title")} />
            {form.formState.errors.title && (
              <p className="mt-1 text-sm text-red-500">{form.formState.errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="content" className="mb-2">
              Content
            </Label>
            <Textarea id="content" rows={8} {...form.register("content")} />
            {form.formState.errors.content && (
              <p className="mt-1 text-sm text-red-500">{form.formState.errors.content.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="published" {...form.register("published")} />
            <Label htmlFor="published">Published</Label>
          </div>

          <div className="flex gap-2">
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
      </CardContent>
    </Card>
  );
}
