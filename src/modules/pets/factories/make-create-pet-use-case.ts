import { PrismaOrganizationsRepository } from '../../../repositories/prisma/prisma-organizations-repository'
import { PrismaPetsRepository } from '../../../repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../use-cases/create'

export function makeCreatePetUseCase(): CreatePetUseCase {
  const petsRepository = new PrismaPetsRepository()
  const organizationsRepository = new PrismaOrganizationsRepository()
  const createOrganizationUseCase = new CreatePetUseCase(
    organizationsRepository,
    petsRepository
  )

  return createOrganizationUseCase
}
