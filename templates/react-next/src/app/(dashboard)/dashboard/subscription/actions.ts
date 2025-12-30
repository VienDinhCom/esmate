"use server";

import { authServer } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function manageSubscriptionAction(formData: FormData) {
  const subscriptionId = formData.get("subscriptionId");

  if (!subscriptionId) redirect("/pricing");

  const portal = await authServer.createBillingPortal({
    locale: "en",
  });

  redirect(portal.url);
}
