import { type Pet } from '@prisma/client'
import { type PetsRepository } from '../../../repositories/pets-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

interface GetPetUseCaseRequest {
  id: number
}

interface GetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({ id }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
