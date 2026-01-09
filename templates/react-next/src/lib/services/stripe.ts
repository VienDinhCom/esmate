import { headers as getHeaders } from "next/headers";
import { auth } from "@/lib/config/auth";
import { BetterBody } from "@/lib/types";


export async function createBillingPortal(
  options: BetterBody<typeof auth.api.createBillingPortal> & { headers?: Headers },
) {
  const headers = options.headers ?? (await getHeaders());

  const res = await auth.api.createBillingPortal({
    body: options,
    headers,
  });

  return res;
}

export async function upgradeSubscription(
  options: BetterBody<typeof auth.api.upgradeSubscription> & { headers?: Headers },
) {
  const headers = options.headers ?? (await getHeaders());

  const res = await auth.api.upgradeSubscription({
    body: options,
    headers,
  });

  return res;
}
