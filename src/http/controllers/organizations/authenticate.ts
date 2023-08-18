import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateOrganizationUseCase } from '../../../modules/organizations/factories/make-authenticate-organization-use-case'
import { InvalidCredentialsError } from '../../../modules/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20)
  })
  try {
    const { email, password } = authenticateSchema.parse(request.body)

    const authenticateOrganizationUseCase =
      makeAuthenticateOrganizationUseCase()

    const { organization } = await authenticateOrganizationUseCase.execute({
      email,
      password
    })

    const token = await reply.jwtSign({}, { sub: String(organization.id) })

    return reply.status(200).send({
      token
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({
        message: error.message
      })
    }

    throw error
  }
}
