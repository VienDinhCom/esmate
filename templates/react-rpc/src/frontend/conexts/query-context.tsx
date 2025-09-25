import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function getQueryContext() {
  const queryClient = new QueryClient()

  return { queryClient }
}

export function QueryProvider({
  children,
  queryClient,
}: {
  children: React.ReactNode
  queryClient: QueryClient
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
