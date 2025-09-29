import { QueryClient } from "@tanstack/react-query";

export function getTanStackQueryContext() {
  const queryClient = new QueryClient();

  return { queryClient };
}
