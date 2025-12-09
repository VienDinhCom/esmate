import Stripe from "stripe";
import invariant from "tiny-invariant";
import { stripe } from "./stripe";

type PricingPlanName = "Base" | "Plus";

export interface PricingPlan {
  name: PricingPlanName;
  price: number;
  description: string;
  interval: string;
  trialDays: number;
  currency: string;
  priceId: string;
  productId: string;
}

type CreatePricingPlan = Pick<PricingPlan, "name" | "price" | "description">;

export async function createPricingPlan(pricingPlan: CreatePricingPlan): Promise<PricingPlan> {
  const product = await stripe.products.create({
    name: pricingPlan.name,
    description: pricingPlan.description,
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: pricingPlan.price * 100,
    currency: "usd",
    recurring: {
      interval: "month",
      trial_period_days: 7,
    },
  });

  const name = product.name as PricingPlanName;
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

    const name = product.name as PricingPlanName;
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

export async function getPricingPlanOrCreate(pricingPlan: CreatePricingPlan) {
  const plans = await getPricingPlans();
  const plan = plans.find((plan) => plan.name === pricingPlan.name);

  if (plan) return plan;

  return createPricingPlan(pricingPlan);
}
