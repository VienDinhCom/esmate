"use server";

import { auth } from "@/lib/auth";
import { Plan } from "@/lib/stripe";
import { headers } from "next/headers";

export async function upgradeSubscriptionAction(formData: FormData) {
  const plan = formData.get("plan") as Plan["name"];

  await auth.api.upgradeSubscription({ body: { plan }, headers: await headers() });
}
