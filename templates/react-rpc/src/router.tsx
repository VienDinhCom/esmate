import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './routeTree.gen'
import {
  QueryProvider,
  getQueryContext,
} from '@/frontend/conexts/query-context'

// Import the generated route tree

// Create a new router instance
export const getRouter = () => {
  const queryContext = getQueryContext()

  const router = createRouter({
    routeTree,
    context: { ...queryContext },
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => {
      return <QueryProvider {...queryContext}>{props.children}</QueryProvider>
    },
  })

  setupRouterSsrQueryIntegration({
    router,
    queryClient: queryContext.queryClient,
  })

  return router
}
