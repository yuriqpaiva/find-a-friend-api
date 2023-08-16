import fastify from 'fastify'
import { organizationsRoutes } from './http/controllers/organizations/routes'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import env from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(organizationsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      details: error.format()
    })
  }

  console.error(error)

  return reply.status(500).send({
    message: 'Internal server error'
  })
})
