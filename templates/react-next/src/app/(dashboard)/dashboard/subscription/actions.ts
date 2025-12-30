"use server";

import { authServer } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function manageSubscriptionAction(formData: FormData) {
  const subscriptionId = formData.get("subscriptionId");

  if (!subscriptionId) redirect("/pricing");

  const { url } = await authServer.createBillingPortal({
    body: { locale: "en" },
    headers: await headers(),
  });

  redirect(url);
}
