"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function manageSubscriptionAction() {
  await auth.api.createBillingPortal({
    body: { returnUrl: "/dashboard", locale: "en" },
    headers: await headers(),
  });
}
