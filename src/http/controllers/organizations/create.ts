import { type FastifyReply, type FastifyRequest } from 'fastify'
import { makeCreateOrganizationUseCase } from '../../../modules/organizations/factories/make-create-organization-use-case'
import { z } from 'zod'

export async function create(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<any> {
  const createOrganizationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
    name: z.string().min(3).max(50),
    owner_name: z.string().min(3).max(50),
    zip_code: z.string().min(8).max(8),
    address: z.string().min(3).max(100),
    whatsapp: z.string().min(11).max(11),
    city: z.string()
  })

  const data = createOrganizationSchema.parse(request.body)

  const createOrganizationUseCase = makeCreateOrganizationUseCase()

  await createOrganizationUseCase.execute(data)

  return reply.status(201).send()
}
