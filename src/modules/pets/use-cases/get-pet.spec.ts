import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '../../../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '../../../repositories/in-memory/in-memory-organizations-repository'
import { GetPetUseCase } from './get-pet'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let getPetUseCase: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    getPetUseCase = new GetPetUseCase(petsRepository)
  })

  it('should be able to get pet by its ID', async () => {
    const organization = await organizationsRepository.create({
      email: 'org@example.com.br',
      password: '123456',
      name: 'Organization Name',
      owner_name: 'Organization Owner Name',
      zip_code: '00000-000',
      address: 'Organization Address',
      whatsapp: '00000000000',
      city: 'São Paulo'
    })

    const createdPet = await petsRepository.create({
      name: 'Pet example',
      description: 'Pet description',
      age: 1,
      size: 1,
      energy_level: 1,
      dependency_level: 1,
      environment: 'Ambiente amplo',
      organization_id: organization.id
    })

    const { pet } = await getPetUseCase.execute({
      id: createdPet.id
    })

    expect(pet).toEqual(createdPet)
  })

  it('should not be able to get pet by its ID if it does not exist', async () => {
    await expect(
      getPetUseCase.execute({
        id: 1
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
