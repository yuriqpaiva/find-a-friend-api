import { type Pet, type Prisma } from '@prisma/client'
import {
  type FindManyByCityQuery,
  type PetsRepository
} from '../pets-repository'
import { type InMemoryOrganizationsRepository } from './in-memory-organizations-repository'

export class InMemoryPetsRepository implements PetsRepository {
  constructor(
    private readonly organizationsRepository: InMemoryOrganizationsRepository
  ) {}

  private readonly pets: Pet[] = []

  async findManyByCity(
    city: string,
    query?: FindManyByCityQuery
  ): Promise<Pet[]> {
    const organizations = this.organizationsRepository.organizations.filter(
      (organization) => organization.city === city
    )

    const pets = this.pets
      .filter((pet) => {
        return organizations.some(
          (organization) => organization.id === pet.organization_id
        )
      })
      .filter((pet) => {
        const ageCondition = !query?.age || pet.age === query.age
        const energyLevelCondition =
          !query?.energy_level || pet.energy_level === query.energy_level
        const sizeCondition = !query?.size || pet.size === query.size
        const dependencyLevelCondition =
          !query?.dependency_level ||
          pet.dependency_level === query.dependency_level

        return (
          ageCondition &&
          energyLevelCondition &&
          sizeCondition &&
          dependencyLevelCondition
        )
      })

    return pets
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
