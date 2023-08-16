import { type FastifyInstance } from 'fastify'
import { create } from './create'
import { authenticate } from './authenticate'

export async function organizationsRoutes(app: FastifyInstance): Promise<void> {
  app.post('/organizations', create)
  app.post('/sessions', authenticate)
}
