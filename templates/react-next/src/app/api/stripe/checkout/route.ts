import { db, schema, orm } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(new URL("/pricing", request.url));
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer", "subscription"],
    });

    if (!session.customer || typeof session.customer === "string") {
      throw new Error("Invalid customer data from Stripe.");
    }

    const customerId = session.customer.id;
    const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;

    if (!subscriptionId) {
      throw new Error("No subscription found for this session.");
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["items.data.price.product"],
    });

    const plan = subscription.items.data[0]?.price;

    if (!plan) {
      throw new Error("No plan found for this subscription.");
    }

    const productId = (plan.product as Stripe.Product).id;

    if (!productId) {
      throw new Error("No product ID found for this subscription.");
    }

    const userId = session.client_reference_id;
    if (!userId) {
      throw new Error("No user ID found in session's client_reference_id.");
    }

    await db
      .insert(schema.stripe)
      .values({
        id: userId,
        customerId: customerId,
        productId: productId,
        subscriptionId: subscriptionId,
        planName: (plan.product as Stripe.Product).name,
        subscriptionStatus: subscription.status,
      })
      .onConflictDoUpdate({
        target: schema.stripe.id,
        set: {
          customerId: customerId,
          productId: productId,
          subscriptionId: subscriptionId,
          planName: (plan.product as Stripe.Product).name,
          subscriptionStatus: subscription.status,
        },
      });

    return NextResponse.redirect(new URL("/dashboard/subscription", request.url));
  } catch (error) {
    console.error("Error handling successful checkout:", error);
    return NextResponse.redirect(new URL("/error", request.url));
  }
}
