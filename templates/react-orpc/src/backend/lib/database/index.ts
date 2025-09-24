import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from './schema.ts'

export const database = drizzle(process.env.DATABASE_URL as string, { schema })
