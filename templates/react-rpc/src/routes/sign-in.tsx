import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@/frontend/components/auth/sign-in'

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SignIn />
}
