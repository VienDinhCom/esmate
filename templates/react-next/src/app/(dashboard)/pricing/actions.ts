"use server";

import { authServer } from "@/lib/auth";
import { env } from "@/lib/env";
import { Plan } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { invariant } from "@esmate/utils";

export async function upgradeSubscriptionAction(formData: FormData) {
  await authServer.authenticate();

  const planName = formData.get("planName") as Plan["name"];

  invariant(planName, "plan is required");

  const session = await authServer.upgradeSubscription({
    plan: planName,
    cancelUrl: `${env.BASE_URL}/pricing`,
    returnUrl: `${env.BASE_URL}/dashboard`,
    successUrl: `${env.BASE_URL}/dashboard/subscription`,
  });

  invariant(session.url, "session url is required");

  redirect(session.url);
}
