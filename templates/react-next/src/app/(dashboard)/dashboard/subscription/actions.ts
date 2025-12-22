"use server";

import { manageSubscription } from "@/lib/stripe";

export async function manageSubscriptionAction() {
  await manageSubscription("/dashboard");
}
