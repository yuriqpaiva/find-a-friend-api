import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchPetsByCityUseCase } from '../../../modules/pets/factories/make-fetch-pets-by-city-use-case'
import { ResourceNotFoundError } from '../../../modules/errors/resource-not-found-error'

export async function search(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const searchPetParamsSchema = z.object({
    cityId: z.coerce.number()
  })

  const searchPetQuerySchema = z.object({
    age: z.coerce.number().optional(),
    energy_level: z.coerce.number().optional(),
    size: z.coerce.number().optional(),
    dependency_level: z.coerce.number().optional()
  })

  try {
    const { cityId } = searchPetParamsSchema.parse(request.params)
    const query = searchPetQuerySchema.parse(request.query)

    const fetchPetsByCityUseCase = makeFetchPetsByCityUseCase()

    const { pets } = await fetchPetsByCityUseCase.execute({ cityId, query })

    return reply.send({ pets })
  } catch (error) {
    console.log(error)

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
