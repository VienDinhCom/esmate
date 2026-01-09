"use server";

import { authenticate } from "@/lib/services/auth";
import { manageSubscription } from "@/lib/services/stripe";

export async function manageSubscriptionAction(formData: FormData) {
  await authenticate();
  await manageSubscription(formData.get("subscriptionId") as string);
}
