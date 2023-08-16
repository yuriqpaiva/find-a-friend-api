import { type FastifyInstance } from 'fastify'
import { create } from './create'

export async function organizationsRoutes(app: FastifyInstance): Promise<void> {
  app.post('/organizations', create)
}
