import z from "zod";
import Stripe from "stripe";
import { env } from "@/lib/config/env";
import { StripePlan } from "@better-auth/stripe";
import { PlanSchema } from "../schema";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-12-15.clover",
});

export interface Plan extends StripePlan {
  name: z.infer<typeof PlanSchema>;
  description: string;
  price: number;
}

async function getPlanOrCreate(plan: Plan): Promise<Plan> {
  let priceId: string;

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

export const plans = {
  base: () =>
    getPlanOrCreate({
      name: "base",
      price: 8,
      description: "Basic plan for personal use",
      freeTrial: {
        days: 7,
      },
    }),
  plus: () =>
    getPlanOrCreate({
      name: "plus",
      price: 12,
      description: "Advanced plan for business use",
      freeTrial: {
        days: 7,
      },
    }),
};
