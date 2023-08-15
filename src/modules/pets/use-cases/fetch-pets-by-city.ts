import { type Pet } from '@prisma/client'
import { type PetsRepository } from '../../../repositories/pets-repository'

interface FetchPetsByCityUseCaseRequest {
  city: string
  query?: {
    age?: number
    energy_level?: number
    size?: number
    dependency_level?: number
  }
}

export class FetchPetsByCityUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute(data: FetchPetsByCityUseCaseRequest): Promise<Pet[]> {
    const pets = await this.petsRepository.findManyByCity(data.city, data.query)

    return pets
  }
}
