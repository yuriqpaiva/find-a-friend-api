import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create'
import { InMemoryPetsRepository } from '../../../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '../../../repositories/in-memory/in-memory-organizations-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let createPetUseCase: CreatePetUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    createPetUseCase = new CreatePetUseCase(
      organizationsRepository,
      petsRepository
    )
  })

  it('should be able to create a new organization', async () => {
    const organization = await organizationsRepository.create({
      email: 'org@example.com.br',
      password: '123456',
      name: 'Organization Name',
      owner_name: 'Organization Owner Name',
      zip_code: '00000-000',
      address: 'Organization Address',
      whatsapp: '00000000000',
      city: 'Organization City'
    })

    const { pet } = await createPetUseCase.execute({
      name: 'Pet example',
      description: 'Pet description',
      age: 1,
      size: 1,
      energy_level: 1,
      dependency_level: 1,
      environment: 'Ambiente amplo',
      organization_id: organization.id
    })

    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(Number)
      })
    )
  })

  it('should not be able to create a pet if organization does not exist', async () => {
    await expect(
      createPetUseCase.execute({
        name: 'Pet example',
        description: 'Pet description',
        age: 1,
        size: 1,
        energy_level: 1,
        dependency_level: 1,
        environment: 'Ambiente amplo',
        organization_id: 1
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
