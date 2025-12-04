import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@esmate/shadcn/components/ui/card";
import { AccountForm } from "./account-form";
import { getAuthOrThrow } from "@/lib/auth";

export default async function GeneralPage() {
  const auth = await getAuthOrThrow();

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        Account
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountForm name={auth.name} email={auth.email} />
        </CardContent>
      </Card>
    </section>
  );
}
