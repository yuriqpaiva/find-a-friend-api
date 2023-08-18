import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetPetUseCase } from '../../../modules/pets/factories/make-get-pet-use-case'

export async function details(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const petDetailSchema = z.object({
    id: z.coerce.number()
  })

  const { id } = petDetailSchema.parse(request.params)

  const getPetUseCase = makeGetPetUseCase()

  const { pet } = await getPetUseCase.execute({ id })

  return reply.send({ pet })
}
