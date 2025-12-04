"use client";

import { manageSubscriptionAction } from "@/lib/payments/actions";
import { Button } from "@esmate/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@esmate/shadcn/components/ui/card";
import { Suspense } from "react";

function SubscriptionSkeleton() {
  return (
    <Card className="mb-8 h-[140px]">
      <CardHeader>
        <CardTitle>Team Subscription</CardTitle>
      </CardHeader>
    </Card>
  );
}

function ManageSubscription() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Team Subscription</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            {/* <div className="mb-4 sm:mb-0">
              <p className="font-medium">
                Current Plan: {teamData?.planName || "Free"}
              </p>
              <p className="text-sm text-muted-foreground">
                {teamData?.subscriptionStatus === "active"
                  ? "Billed monthly"
                  : teamData?.subscriptionStatus === "trialing"
                  ? "Trial period"
                  : "No active subscription"}
              </p>
            </div> */}
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
      <h1 className="text-lg lg:text-2xl font-medium mb-6">Settings</h1>
      <Suspense fallback={<SubscriptionSkeleton />}>
        <ManageSubscription />
      </Suspense>
    </section>
  );
}
