import { type FastifyInstance } from 'fastify'
import { create } from './create'
import { details } from './details'

export async function petsRoutes(app: FastifyInstance): Promise<void> {
  app.post('/pets', create)
  app.get('/pets/:id', details)
}
