"use server";

import { invariant } from "@esmate/utils";
import { redirect } from "next/navigation";
import { authenticate } from "@/lib/services/auth";
import { upgradeSubscription } from "@/lib/services/stripe";
import { PlanSchema } from "@/lib/schema";

export async function upgradeSubscriptionAction(formData: FormData) {
  await authenticate();

  const plan = PlanSchema.parse(formData.get("planName"));
  const session = await upgradeSubscription(plan);

  invariant(session.url, "session url is required");
  redirect(session.url);
}
