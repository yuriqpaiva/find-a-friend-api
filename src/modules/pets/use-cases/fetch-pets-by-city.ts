import { type Pet } from '@prisma/client'
import { type PetsRepository } from '../../../repositories/pets-repository'
import { brazilStates } from '../../../constants/brazil-states'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

interface FetchPetsByCityUseCaseRequest {
  cityId: number
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
    const cityName = brazilStates.find((state) => state.id === data.cityId)
      ?.name

    if (!cityName) {
      throw new ResourceNotFoundError()
    }

    const pets = await this.petsRepository.findManyByCity(cityName, data.query)

    return pets
  }
}
