import Stripe from "stripe";
import { env } from "./env";
import invariant from "tiny-invariant";
import { getAuthOrRedirect } from "./auth";
import { redirect } from "next/navigation";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-11-17.clover",
});

export interface PricingPlan {
  name: string;
  price: number;
  description: string;
  interval: string;
  trialDays: number;
  currency: string;
  priceId: string;
  productId: string;
}

type CreatePricingPlan = Pick<PricingPlan, "name" | "price" | "description">;

export async function createPricingPlan(subscription: CreatePricingPlan): Promise<PricingPlan> {
  const product = await stripe.products.create({
    name: subscription.name,
    description: subscription.description,
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: subscription.price * 100,
    currency: "usd",
    recurring: {
      interval: "month",
      trial_period_days: 7,
    },
  });

  const name = product.name;
  const amount = price.unit_amount;
  const description = product.description;
  const interval = price.recurring?.interval;
  const trialDays = price.recurring?.trial_period_days;
  const currency = price.currency;

  invariant(amount, "Price amount is required");
  invariant(description, "Product description is required");
  invariant(interval, "Price interval is required");
  invariant(trialDays, "Price trial days is required");
  invariant(currency, "Price currency is required");

  return {
    name,
    interval,
    currency,
    trialDays,
    description,
    priceId: price.id,
    productId: product.id,
    price: amount / 100,
  };
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  const prices = await stripe.prices.list({
    expand: ["data.product"],
    active: true,
    type: "recurring",
  });

  return prices.data.map((price) => {
    const product = price.product as Stripe.Product;

    const name = product.name;
    const amount = price.unit_amount;
    const description = product.description;
    const interval = price.recurring?.interval;
    const trialDays = price.recurring?.trial_period_days;
    const currency = price.currency;

    invariant(name, "Product name is required");
    invariant(amount, "Price amount is required");
    invariant(description, "Product description is required");
    invariant(interval, "Price interval is required");
    invariant(trialDays, "Price trial days is required");
    invariant(currency, "Price currency is required");

    return {
      name,
      interval,
      currency,
      trialDays,
      description,
      priceId: price.id,
      productId: product.id,
      price: amount / 100,
    };
  });
}

export async function getPricingPlanByName(name: string) {
  const plans = await getPricingPlans();

  return plans.find((plan) => plan.name === name);
}

// createSubscription
// manageSubscription
// handleSubscriptionChange

export async function createSubscription(priceId: string) {
  const auth = await getAuthOrRedirect();

  // const user = await getUser();

  // if (!team || !user) {
  //   redirect(`/sign-up?redirect=checkout&priceId=${priceId}`);
  // }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${env.BASE_URL}/api/stripe/checkout?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.BASE_URL}/pricing`,
    customer: team.stripeCustomerId || undefined,
    client_reference_id: auth.id.toString(),
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: 14,
    },
  });

  invariant(session.url, "Checkout session URL is required");

  redirect(session.url);
}

export async function manageSubscription(team: Team) {
  if (!team.stripeCustomerId || !team.stripeProductId) {
    redirect("/pricing");
  }

  let configuration: Stripe.BillingPortal.Configuration;
  const configurations = await stripe.billingPortal.configurations.list();

  if (configurations.data.length > 0) {
    configuration = configurations.data[0];
  } else {
    const product = await stripe.products.retrieve(team.stripeProductId);
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
    customer: team.stripeCustomerId,
    return_url: `${process.env.BASE_URL}/dashboard`,
    configuration: configuration.id,
  });
}

export async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const subscriptionId = subscription.id;
  const status = subscription.status;

  const team = await getTeamByStripeCustomerId(customerId);

  if (!team) {
    console.error("Team not found for Stripe customer:", customerId);
    return;
  }

  if (status === "active" || status === "trialing") {
    const plan = subscription.items.data[0]?.plan;
    await updateTeamSubscription(team.id, {
      stripeSubscriptionId: subscriptionId,
      stripeProductId: plan?.product as string,
      planName: (plan?.product as Stripe.Product).name,
      subscriptionStatus: status,
    });
  } else if (status === "canceled" || status === "unpaid") {
    await updateTeamSubscription(team.id, {
      stripeSubscriptionId: null,
      stripeProductId: null,
      planName: null,
      subscriptionStatus: status,
    });
  }
}
