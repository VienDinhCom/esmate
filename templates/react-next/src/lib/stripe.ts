import Stripe from "stripe";
import { env } from "./env";
import invariant from "tiny-invariant";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-11-17.clover",
});

export interface Subscription {
  name: string;
  price: number;
  description: string;
  interval: string;
  trialDays: number;
  currency: string;
  priceId: string;
  productId: string;
}

export async function createSubscription(
  subscription: Pick<Subscription, "name" | "price" | "description">,
): Promise<Subscription> {
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

export async function getSubscriptions(): Promise<Subscription[]> {
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

export async function getSubscriptionByName(name: string) {
  const subscriptions = await getSubscriptions();

  return subscriptions.find((subscription) => subscription.name === name);
}

// export async function createCheckoutSession({ team, priceId }: { team: Team | null; priceId: string }) {
//   const user = await getUser();

//   if (!team || !user) {
//     redirect(`/sign-up?redirect=checkout&priceId=${priceId}`);
//   }

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price: priceId,
//         quantity: 1,
//       },
//     ],
//     mode: "subscription",
//     success_url: `${process.env.BASE_URL}/api/stripe/checkout?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${process.env.BASE_URL}/pricing`,
//     customer: team.stripeCustomerId || undefined,
//     client_reference_id: user.id.toString(),
//     allow_promotion_codes: true,
//     subscription_data: {
//       trial_period_days: 14,
//     },
//   });

//   redirect(session.url!);
// }
