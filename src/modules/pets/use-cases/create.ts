import { type Pet } from '@prisma/client'
import { type PetsRepository } from '../../../repositories/pets-repository'
import { type OrganizationsRepository } from '../../../repositories/organizations-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: number
  size: number
  energy_level: number
  dependency_level: number
  environment: string
  organization_id: number
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private readonly organizationsRepository: OrganizationsRepository,
    private readonly petsRepository: PetsRepository
  ) {}

  async execute(
    data: CreatePetUseCaseRequest
  ): Promise<CreatePetUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(
      data.organization_id
    )

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create(data)

    return { pet }
  }
}
