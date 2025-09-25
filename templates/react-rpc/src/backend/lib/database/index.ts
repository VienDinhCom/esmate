import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema.ts'
import { env } from '@/shared/lib/env'

console.log('env.DATABASE_URL', env.DATABASE_URL)

export const database = drizzle(env.DATABASE_URL, { schema })
