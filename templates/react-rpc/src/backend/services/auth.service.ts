import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { database } from '@/backend/database'

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
  rateLimit: {
    enabled: true,
  },
})

export const authService = auth.api
