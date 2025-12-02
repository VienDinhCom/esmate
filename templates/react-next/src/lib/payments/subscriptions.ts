import Stripe from "stripe";
import { stripe } from "./stripe";
import { env } from "@/lib/env";
import invariant from "tiny-invariant";
import { getAuthOrRedirect } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { user } from "@/lib/db/schema";

export async function createSubscription(priceId: string) {
  const auth = await getAuthOrRedirect();
  const userData = await db.query.user.findFirst({ where: eq(user.id, auth.id) });

  // const user = await getUser();

  // if (!team || !user) {
  //   redirect(`/sign-up?redirect=checkout&priceId=${priceId}`);
  // }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${env.BASE_URL}/api/stripe/checkout?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.BASE_URL}/pricing`,
    customer: userData?.stripeCustomerId || undefined,
    client_reference_id: auth.id.toString(),
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: 14,
    },
  });

  invariant(session.url, "Checkout session URL is required");

  redirect(session.url);
}

export async function manageSubscription() {
  const auth = await getAuthOrRedirect();
  const userData = await db.query.user.findFirst({ where: eq(user.id, auth.id) });

  if (!userData?.stripeCustomerId || !userData?.stripeProductId) {
    redirect("/pricing");
  }

  let configuration: Stripe.BillingPortal.Configuration;
  const configurations = await stripe.billingPortal.configurations.list();

  if (configurations.data.length > 0) {
    configuration = configurations.data[0];
  } else {
    const product = await stripe.products.retrieve(userData.stripeProductId);

    if (!product.active) {
      throw new Error("Team's product is not active in Stripe");
    }

    const prices = await stripe.prices.list({
      product: product.id,
      active: true,
    });
    if (prices.data.length === 0) {
      throw new Error("No active prices found for the team's product");
    }

    configuration = await stripe.billingPortal.configurations.create({
      business_profile: {
        headline: "Manage your subscription",
      },
      features: {
        subscription_update: {
          enabled: true,
          default_allowed_updates: ["price", "quantity", "promotion_code"],
          proration_behavior: "create_prorations",
          products: [
            {
              product: product.id,
              prices: prices.data.map((price) => price.id),
            },
          ],
        },
        subscription_cancel: {
          enabled: true,
          mode: "at_period_end",
          cancellation_reason: {
            enabled: true,
            options: ["too_expensive", "missing_features", "switched_service", "unused", "other"],
          },
        },
        payment_method_update: {
          enabled: true,
        },
      },
    });
  }

  return stripe.billingPortal.sessions.create({
    customer: userData.stripeCustomerId,
    return_url: `${env.BASE_URL}/dashboard`,
    configuration: configuration.id,
  });
}

export async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const subscriptionId = subscription.id;
  const status = subscription.status;

  const userData = await db.query.user.findFirst({ where: eq(user.stripeCustomerId, customerId) });

  if (!userData) {
    console.error("Team not found for Stripe customer:", customerId);
    return;
  }

  async function updateUserSubscription(
    userId: string,
    subscriptionData: {
      stripeSubscriptionId: string | null;
      stripeProductId: string | null;
      planName: string | null;
      subscriptionStatus: string;
    },
  ) {
    await db
      .update(user)
      .set({ ...subscriptionData, updatedAt: new Date() })
      .where(eq(user.id, userId));
  }

  if (status === "active" || status === "trialing") {
    const plan = subscription.items.data[0]?.plan;
    await updateUserSubscription(userData.id, {
      stripeSubscriptionId: subscriptionId,
      stripeProductId: plan?.product as string,
      planName: (plan?.product as Stripe.Product).name,
      subscriptionStatus: status,
    });
  } else if (status === "canceled" || status === "unpaid") {
    await updateUserSubscription(userData.id, {
      stripeSubscriptionId: null,
      stripeProductId: null,
      planName: null,
      subscriptionStatus: status,
    });
  }
}
