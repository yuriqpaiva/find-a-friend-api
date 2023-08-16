import fastify from 'fastify'
import { organizationsRoutes } from './http/controllers/organizations/routes'
import { ZodError } from 'zod'

export const app = fastify()

app.register(organizationsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      details: error.format()
    })
  }

  return reply.status(500).send({
    message: 'Internal server error'
  })
})
