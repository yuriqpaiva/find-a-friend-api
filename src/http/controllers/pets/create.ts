import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '../../../modules/pets/factories/make-create-pet-use-case'

export async function create(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const createPetSchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.number(),
    size: z.number(),
    energy_level: z.number(),
    dependency_level: z.number(),
    environment: z.string(),
    organization_id: z.number()
  })

  const data = createPetSchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute(data)

  return reply.status(201).send()
}
