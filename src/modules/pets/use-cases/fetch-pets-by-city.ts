import { type Pet } from '@prisma/client'
import { type PetsRepository } from '../../../repositories/pets-repository'

interface FetchPetsByCityUseCaseRequest {
  city: string
}

export class FetchPetsByCityUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute(data: FetchPetsByCityUseCaseRequest): Promise<Pet[]> {
    const pets = await this.petsRepository.findManyByCity(data.city)

    return pets
  }
}
