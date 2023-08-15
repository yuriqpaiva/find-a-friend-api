import { type Pet, type Prisma } from '@prisma/client'

export interface PetsRepository {
  findManyByCity: (city: string) => Promise<Pet[]>
  create: (data: Prisma.PetUncheckedCreateInput) => Promise<Pet>
}
