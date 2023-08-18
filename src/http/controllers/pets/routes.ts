import { type FastifyInstance } from 'fastify'
import { create } from './create'
import { details } from './details'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance): Promise<void> {
  app.post('/pets', create)
  app.get('/pets/:id', details)
  app.get('/pets/city/:cityId', search)
}
