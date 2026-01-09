"use server";

import { authenticate } from "@/lib/services/auth";
import { createBillingPortal } from "@/lib/stripe";
import { redirect } from "next/navigation";

export async function manageSubscriptionAction(formData: FormData) {
  const auth = await authenticate();

  const subscriptionId = formData.get("subscriptionId");

  if (!subscriptionId) redirect("/pricing");

  const portal = await createBillingPortal({
    locale: "en",
    headers: auth.headers,
  });

  redirect(portal.url);
}
