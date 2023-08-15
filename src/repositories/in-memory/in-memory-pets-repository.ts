import { type Pet, type Prisma } from '@prisma/client'
import { type PetsRepository } from '../pets-repository'
import { type InMemoryOrganizationsRepository } from './in-memory-organizations-repository'

export class InMemoryPetsRepository implements PetsRepository {
  constructor(
    private readonly organizationsRepository: InMemoryOrganizationsRepository
  ) {}

  private readonly pets: Pet[] = []

  async findManyByCity(city: string): Promise<Pet[]> {
    const organizations = this.organizationsRepository.organizations.filter(
      (organization) => organization.city === city
    )

    return this.pets.filter((pet) => {
      return organizations.some(
        (organization) => organization.id === pet.organization_id
      )
    })
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const newPet: Pet = {
      ...data,
      id: this.pets.length + 1,
      created_at: new Date() ?? null,
      description: data.description ?? null,
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
      organization_id: data.organization_id ?? null
    }
    this.pets.push(newPet)
    return newPet
  }
}
