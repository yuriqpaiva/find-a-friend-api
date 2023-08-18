import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetPetUseCase } from '../../../modules/pets/factories/make-get-pet-use-case'
import { ResourceNotFoundError } from '../../../modules/errors/resource-not-found-error'

export async function details(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const petDetailSchema = z.object({
    id: z.coerce.number()
  })

  try {
    const { id } = petDetailSchema.parse(request.params)

    const getPetUseCase = makeGetPetUseCase()

    const { pet } = await getPetUseCase.execute({ id })

    return reply.send({ pet })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
