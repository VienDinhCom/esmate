"use server";

import { authServer } from "@/lib/auth";
import { createBillingPortal } from "@/lib/stripe";
import { redirect } from "next/navigation";

export async function manageSubscriptionAction(formData: FormData) {
  const auth = await authServer.authenticate();

  const subscriptionId = formData.get("subscriptionId");

  if (!subscriptionId) redirect("/pricing");

  const portal = await createBillingPortal({
    locale: "en",
    headers: auth.headers,
  });

  redirect(portal.url);
}
