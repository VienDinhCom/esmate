import { getAuthOrThrow } from "@/lib/auth";
import { db, orm, schema } from "@/lib/db";
import { manageSubscriptionAction } from "@/lib/stripe";
import { Button } from "@esmate/shadcn/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@esmate/shadcn/components/ui/card";
import { Suspense } from "react";

function SubscriptionSkeleton() {
  return (
    <Card className="mb-8 h-[140px]">
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
      </CardHeader>
    </Card>
  );
}

async function ManageSubscription() {
  const auth = await getAuthOrThrow();
  const user = await db.query.user.findFirst({
    where: orm.eq(schema.user.id, auth.id),
    with: {
      stripe: true,
    },
  });

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <div className="mb-4 sm:mb-0">
              <p className="font-medium">Current Plan: {user?.stripe?.planName || "Free"}</p>
              <p className="text-sm text-muted-foreground">
                {user?.stripe?.subscriptionStatus === "active"
                  ? "Billed monthly"
                  : user?.stripe?.subscriptionStatus === "trialing"
                    ? "Trial period"
                    : "No active subscription"}
              </p>
            </div>
            <form action={manageSubscriptionAction}>
              <Button type="submit" variant="outline">
                Manage Subscription
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="mb-6 text-lg font-medium lg:text-2xl">Subscription</h1>
      <Suspense fallback={<SubscriptionSkeleton />}>
        <ManageSubscription />
      </Suspense>
    </section>
  );
}
