import { authService } from '@/frontend/services/auth.service'
import { SignIn } from '@/frontend/components/auth/sign-in'
import { SignUp } from '@/frontend/components/auth/sign-up'

export function Profile() {
  const { data: session, isPending, error, refetch } = authService.useSession()

  if (isPending) {
    return <div>Loading...</div>
  }

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    )
  }

  if (!session) {
    return (
      <div>
        <SignUp />
        <hr />
        <SignIn />
      </div>
    )
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>
        Email:
        {session.user.email}
      </p>
      <p>
        Username:
        {session.user.name}
      </p>
      <button type="button" onClick={() => authService.signOut()}>
        Sign Out
      </button>
      <button type="button" onClick={() => refetch()}>
        Refresh Session
      </button>
    </div>
  )
}
