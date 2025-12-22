"use server";

import { Plan, upgradeSubscription } from "@/lib/stripe";

export async function upgradeSubscriptionAction(formData: FormData) {
  const plan = formData.get("plan") as Plan["name"];

  await upgradeSubscription(plan);
}
