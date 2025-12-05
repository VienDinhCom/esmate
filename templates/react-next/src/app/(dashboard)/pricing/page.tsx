import { Check } from "@esmate/shadcn/pkgs/lucide-react";
import { SubmitButton } from "./submit-button";
import { getPricingPlanOrCreate } from "@/lib/payments";
import { createSubscriptionAction } from "@/lib/payments/actions";

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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8 max-w-xl mx-auto">
        <PricingCard
          name={basePlan.name}
          price={basePlan.price}
          interval={basePlan.interval}
          trialDays={basePlan.trialDays}
          features={[
            "Unlimited Usage",
            "Unlimited Workspace Members",
            "Email Support",
          ]}
          priceId={basePlan.priceId}
        />
        <PricingCard
          name={plusPlan.name}
          price={plusPlan.price}
          interval={plusPlan.interval}
          trialDays={plusPlan.trialDays}
          features={[
            "Everything in Base, and:",
            "Early Access to New Features",
            "24/7 Support + Slack Access",
          ]}
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
      <h2 className="text-2xl font-medium text-gray-900 mb-2">{name}</h2>
      <p className="text-sm text-gray-600 mb-4">
        with {trialDays} day free trial
      </p>
      <p className="text-4xl font-medium text-gray-900 mb-6">
        ${price}{" "}
        <span className="text-xl font-normal text-gray-600">
          per user / {interval}
        </span>
      </p>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
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
