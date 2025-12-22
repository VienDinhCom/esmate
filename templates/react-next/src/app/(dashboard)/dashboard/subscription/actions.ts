"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function manageSubscriptionAction() {
  const { url } = await auth.api.createBillingPortal({
    body: { locale: "en" },
    headers: await headers(),
  });

  redirect(url);
}
