import { Card, CardContent, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { AccountForm } from "./account-form";
import { authenticate } from "@/lib/services/auth";

export default async function GeneralPage() {
  const auth = await authenticate();

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="mb-6 text-lg font-medium text-gray-900 lg:text-2xl">Account</h1>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountForm name={auth.user.name} email={auth.user.email} />
        </CardContent>
      </Card>
    </section>
  );
}
