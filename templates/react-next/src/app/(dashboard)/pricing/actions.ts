"use server";

import { auth, getAuthOrSignIn } from "@/lib/auth";
import { env } from "@/lib/env";
import { Plan } from "@/lib/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import invariant from "tiny-invariant";

export async function upgradeSubscriptionAction(formData: FormData) {
  await getAuthOrSignIn("/pricing");

  const planName = formData.get("planName") as Plan["name"];

  invariant(planName, "plan is required");

  const session = await auth.api.upgradeSubscription({
    body: {
      plan: planName,
      cancelUrl: `${env.BASE_URL}/pricing`,
      returnUrl: `${env.BASE_URL}/dashboard`,
      successUrl: `${env.BASE_URL}/dashboard/subscription`,
    },
    headers: await headers(),
  });

  invariant(session.url, "session url is required");

  redirect(session.url);
}
