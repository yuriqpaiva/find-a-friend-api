import { type PetsRepository } from '../pets-repository'

import { prisma } from '../../lib/prisma'
import { type Pet, type Prisma } from '@prisma/client'

export class PrismaPetsRepository implements PetsRepository {
  async findManyByCity(city: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        organization: {
          city: {
            equals: city
          }
        }
      }
    })

    return pets
  }

  async findById(id: number): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id
      }
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data
    })

    return pet
  }
}
