"use server";

import { authenticate } from "@/lib/services/auth";
import { env } from "@/lib/config/env";
import { Plan } from "@/lib/config/stripe";
import { redirect } from "next/navigation";
import { invariant } from "@esmate/utils";
import { upgradeSubscription } from "@/lib/services/stripe";

export async function upgradeSubscriptionAction(formData: FormData) {
  const auth = await authenticate();

  const planName = formData.get("planName") as Plan["name"];

  invariant(planName, "plan is required");

  const session = await upgradeSubscription({
    plan: planName,
    headers: auth.headers,
    cancelUrl: `${env.BASE_URL}/pricing`,
    returnUrl: `${env.BASE_URL}/dashboard`,
    successUrl: `${env.BASE_URL}/dashboard/subscription`,
  });

  invariant(session.url, "session url is required");

  redirect(session.url);
}
