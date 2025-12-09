"use server";

import { createSubscription, manageSubscription } from "@/lib/stripe";
import { redirect } from "next/navigation";

export async function createSubscriptionAction(formData: FormData) {
  const priceId = formData.get("priceId") as string;
  await createSubscription(priceId);
}

export async function manageSubscriptionAction() {
  const { url } = await manageSubscription();
  redirect(url);
}
