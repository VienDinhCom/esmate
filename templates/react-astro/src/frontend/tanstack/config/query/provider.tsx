import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function TanStackQueryProvider({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
}) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
