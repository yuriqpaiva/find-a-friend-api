import 'dotenv/config'
import { z } from 'zod'

const environmentVariablesSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string()
})

const env = environmentVariablesSchema.safeParse(process.env)

if (!env.success) {
  const formattedErrors = env.error.format()
  console.error('⚠️ Invalid environment variables', formattedErrors)

  throw new Error('Invalid environment variables')
}

export default env.data
