import { useZodForm } from '@esmate/shadcn/hooks/use-zod-form'
import { Button } from '@esmate/shadcn/ui/button'
import { z } from 'zod'

import { auth } from '@/frontend/lib/auth'

const FormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export function SignIn() {
  const form = useZodForm({
    schema: FormSchema,
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = form.handleSubmit(async ({ email, password }) => {
    await auth.signIn.email({
      email,
      password,
      callbackURL: '/',
    })
  })

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={onSubmit}>
        <label>
          Email:
          <input type="email" {...form.register('email')} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" {...form.register('password')} />
        </label>
        <br />
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  )
}
