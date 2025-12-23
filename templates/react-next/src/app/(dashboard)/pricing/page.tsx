import { Check } from "@esmate/shadcn/pkgs/lucide-react";
import { SubmitButton } from "./submit-button";
import { plans } from "@/lib/stripe";
import invariant from "tiny-invariant";
import { upgradeSubscriptionAction } from "./actions";

// Prices are fresh for one hour max
export const revalidate = 3600;

export default async function PricingPage() {
  const basePlan = await plans.base();
  const plusPlan = await plans.plus();

  invariant(basePlan.freeTrial?.days, "base plan must have a free trial");
  invariant(plusPlan.freeTrial?.days, "plus plan must have a free trial");

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-xl gap-8 md:grid-cols-2">
        <PricingCard
          name={basePlan.name.toUpperCase()}
          price={basePlan.price}
          trialDays={basePlan.freeTrial.days}
          features={["Unlimited Usage", "Unlimited Workspace Members", "Email Support"]}
          interval="month"
        />
        <PricingCard
          name={plusPlan.name.toUpperCase()}
          price={plusPlan.price}
          trialDays={plusPlan.freeTrial.days}
          features={["Everything in Base, and:", "Early Access to New Features", "24/7 Support + Slack Access"]}
          interval="month"
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
}: {
  name: string;
  price: number;
  interval: string;
  trialDays: number;
  features: string[];
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
            <Check className="mt-0.5 mr-2 h-5 w-5 shrink-0 text-blue-500" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <form action={upgradeSubscriptionAction}>
        <input type="hidden" name="planName" value={name} />
        <SubmitButton />
      </form>
    </div>
  );
}
