import { type Pet, type Prisma } from '@prisma/client'

export interface FindManyByCityQuery {
  age?: number
  energy_level?: number
  size?: number
  dependency_level?: number
}

export interface PetsRepository {
  findManyByCity: (city: string, query?: FindManyByCityQuery) => Promise<Pet[]>
  create: (data: Prisma.PetUncheckedCreateInput) => Promise<Pet>
}
