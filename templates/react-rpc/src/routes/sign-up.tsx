import { createFileRoute } from '@tanstack/react-router'
import { SignUp } from '@/frontend/components/auth/sign-up'

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SignUp />
}
