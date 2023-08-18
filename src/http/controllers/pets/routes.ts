import { type FastifyInstance } from 'fastify'
import { create } from './create'

export async function petsRoutes(app: FastifyInstance): Promise<void> {
  app.post('/pets', create)
}
