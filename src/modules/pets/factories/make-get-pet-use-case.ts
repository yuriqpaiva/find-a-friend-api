import { PrismaPetsRepository } from '../../../repositories/prisma/prisma-pets-repository'
import { GetPetUseCase } from '../use-cases/get-pet'

export function makeGetPetUseCase(): GetPetUseCase {
  const petsRepository = new PrismaPetsRepository()
  const createOrganizationUseCase = new GetPetUseCase(petsRepository)

  return createOrganizationUseCase
}
