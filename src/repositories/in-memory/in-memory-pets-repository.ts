import { type Pet, type Prisma } from '@prisma/client'
import { type PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  private readonly pets: Pet[] = []

  async create(pet: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const newPet: Pet = {
      ...pet,
      id: this.pets.length + 1,
      created_at: new Date() ?? null,
      description: pet.description ?? null,
      adopted_at: pet.adopted_at ? new Date(pet.adopted_at) : null
    }
    this.pets.push(newPet)
    return newPet
  }
}
