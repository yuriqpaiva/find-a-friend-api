import { type Pet } from '@prisma/client'
import { type PetsRepository } from '../../../repositories/pets-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

interface GetPetUseCaseRequest {
  id: number
}

export class GetPetUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({ id }: GetPetUseCaseRequest): Promise<Pet> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return pet
  }
}
