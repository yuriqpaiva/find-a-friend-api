import { PrismaPetsRepository } from '../../../repositories/prisma/prisma-pets-repository'
import { FetchPetsByCityUseCase } from '../use-cases/fetch-pets-by-city'

export function makeFetchPetsByCityUseCase(): FetchPetsByCityUseCase {
  const petsRepository = new PrismaPetsRepository()
  const fetchPetsByCityUseCase = new FetchPetsByCityUseCase(petsRepository)

  return fetchPetsByCityUseCase
}
