import { useZodForm } from '@esmate/shadcn/hooks/use-zod-form'
import { z } from '@esmate/shadcn/zod'

import { authService } from '@/frontend/services/auth.service'

const FormSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export function SignUp() {
  const form = useZodForm({
    schema: FormSchema,
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  })

  const onSubmit = form.handleSubmit(async ({ email, username, password }) => {
    await authService.signUp.email({
      email,
      password,
      name: username,
      callbackURL: '/',
    })
  })

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit}>
        <label>
          Email:
          <input type="email" {...form.register('email')} />
        </label>
        <br />

        <label>
          Username:
          <input type="text" {...form.register('username')} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" {...form.register('password')} />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
