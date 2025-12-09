import { Check } from "@esmate/shadcn/pkgs/lucide-react";
import { SubmitButton } from "./submit-button";
import { getPricingPlanOrCreate, createSubscriptionAction } from "@/lib/stripe";

// Prices are fresh for one hour max
export const revalidate = 3600;

export default async function PricingPage() {
  const basePlan = await getPricingPlanOrCreate({
    name: "Base",
    price: 8,
    description: "Basic plan for personal use",
  });

  const plusPlan = await getPricingPlanOrCreate({
    name: "Plus",
    price: 12,
    description: "Advanced plan for business use",
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-xl gap-8 md:grid-cols-2">
        <PricingCard
          name={basePlan.name}
          price={basePlan.price}
          interval={basePlan.interval}
          trialDays={basePlan.trialDays}
          features={["Unlimited Usage", "Unlimited Workspace Members", "Email Support"]}
          priceId={basePlan.priceId}
        />
        <PricingCard
          name={plusPlan.name}
          price={plusPlan.price}
          interval={plusPlan.interval}
          trialDays={plusPlan.trialDays}
          features={["Everything in Base, and:", "Early Access to New Features", "24/7 Support + Slack Access"]}
          priceId={plusPlan.priceId}
        />
      </div>
    </main>
  );
}

function PricingCard({
  name,
  price,
  interval,
  trialDays,
  features,
  priceId,
}: {
  name: string;
  price: number;
  interval: string;
  trialDays: number;
  features: string[];
  priceId?: string;
}) {
  return (
    <div className="pt-6">
      <h2 className="mb-2 text-2xl font-medium text-gray-900">{name}</h2>
      <p className="mb-4 text-sm text-gray-600">with {trialDays} day free trial</p>
      <p className="mb-6 text-4xl font-medium text-gray-900">
        ${price} <span className="text-xl font-normal text-gray-600">per user / {interval}</span>
      </p>
      <ul className="mb-8 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <form action={createSubscriptionAction}>
        <input type="hidden" name="priceId" value={priceId} />
        <SubmitButton />
      </form>
    </div>
  );
}
