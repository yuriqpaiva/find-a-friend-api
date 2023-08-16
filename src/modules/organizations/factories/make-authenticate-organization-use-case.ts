import { PrismaOrganizationsRepository } from '../../../repositories/prisma/prisma-organizations-repository'
import { AuthenticateOrganizationUseCase } from '../use-cases/authenticate-organization'

export function makeAuthenticateOrganizationUseCase(): AuthenticateOrganizationUseCase {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const authenticateOrganizationUseCase = new AuthenticateOrganizationUseCase(
    organizationsRepository
  )

  return authenticateOrganizationUseCase
}
