import Stripe from "stripe";
import { env } from "@/lib/env";
import { stripe as betterAuthStripe, StripePlan } from "@better-auth/stripe";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-12-15.clover",
});

export interface Plan extends StripePlan {
  name: "base" | "plus";
  description: string;
  price: number;
}

export async function getPlanOrCreate(plan: Plan): Promise<Plan> {
  let priceId: string;

  console.log("getPlanOrCreate", plan.name);

  const prices = await stripe.prices.list({
    active: true,
    type: "recurring",
    expand: ["data.product"],
  });

  const price = prices.data.find((price) => {
    const product = price.product as Stripe.Product;
    return product.name === plan.name;
  });

  if (price) {
    priceId = price.id;
  } else {
    const product = await stripe.products.create({
      name: plan.name,
      description: plan.description,
    });

    const price = await stripe.prices.create({
      currency: "usd",
      product: product.id,
      unit_amount: plan.price * 100,
      recurring: {
        interval: "month",
        trial_period_days: plan.freeTrial?.days,
      },
    });

    priceId = price.id;
  }

  return {
    priceId,
    name: plan.name,
    price: plan.price,
    freeTrial: plan.freeTrial,
    description: plan.description,
  };
}

export const basePlan = await getPlanOrCreate({
  name: "base",
  price: 8,
  description: "Basic plan for personal use",
  freeTrial: {
    days: 7,
  },
});

export const plusPlan = await getPlanOrCreate({
  name: "plus",
  price: 12,
  description: "Advanced plan for business use",
  freeTrial: {
    days: 7,
  },
});

export const stripePlugin = betterAuthStripe({
  stripeClient: stripe,
  createCustomerOnSignUp: true,
  stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
  subscription: {
    enabled: true,
    plans: [basePlan, plusPlan],
  },
});
