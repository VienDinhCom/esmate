"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/config/auth";
import { Plan } from "@/lib/config/stripe";
import { env } from "@/lib/config/env";
import { redirect } from "next/navigation";

export async function upgradeSubscription(plan: Plan["name"]) {
  const res = await auth.api.upgradeSubscription({
    body: {
      plan,
      cancelUrl: `${env.BASE_URL}/pricing`,
      returnUrl: `${env.BASE_URL}/dashboard`,
      successUrl: `${env.BASE_URL}/dashboard/subscription`,
    },
    headers: await headers(),
  });

  return res;
}

export async function manageSubscription(subscriptionId?: string) {
  if (!subscriptionId) {
    redirect("/pricing");
  }

  const portal = await auth.api.createBillingPortal({
    body: { locale: "en" },
    headers: await headers(),
  });

  redirect(portal.url);
}
