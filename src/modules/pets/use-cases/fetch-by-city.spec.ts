import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '../../../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '../../../repositories/in-memory/in-memory-organizations-repository'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let fetchPetsByCityUseCase: FetchPetsByCityUseCase

describe('Fetch Pets by City Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    fetchPetsByCityUseCase = new FetchPetsByCityUseCase(petsRepository)
  })

  it('should be able to fetch pets by city', async () => {
    const organization = await organizationsRepository.create({
      email: 'org@example.com.br',
      password: '123456',
      name: 'Organization Name',
      owner_name: 'Organization Owner Name',
      zip_code: '00000-000',
      address: 'Organization Address',
      whatsapp: '00000000000',
      city: 'Acre'
    })

    const firstPet = await petsRepository.create({
      name: 'Pet example',
      description: 'Pet description',
      age: 1,
      size: 1,
      energy_level: 1,
      dependency_level: 1,
      environment: 'Ambiente amplo',
      organization_id: organization.id
    })

    const secondPet = await petsRepository.create({
      name: 'Pet example',
      description: 'Pet description',
      age: 1,
      size: 1,
      energy_level: 1,
      dependency_level: 1,
      environment: 'Ambiente amplo',
      organization_id: organization.id
    })

    const { pets } = await fetchPetsByCityUseCase.execute({
      cityId: 1
    })

    expect(pets).toEqual([firstPet, secondPet])
  })

  it('should be able to get an empty return if city does not match', async () => {
    const organization = await organizationsRepository.create({
      email: 'org@example.com.br',
      password: '123456',
      name: 'Organization Name',
      owner_name: 'Organization Owner Name',
      zip_code: '00000-000',
      address: 'Organization Address',
      whatsapp: '00000000000',
      city: 'Acre'
    })

    await petsRepository.create({
      name: 'Pet example',
      description: 'Pet description',
      age: 1,
      size: 1,
      energy_level: 1,
      dependency_level: 1,
      environment: 'Ambiente amplo',
      organization_id: organization.id
    })

    const notMatchId = 2

    const { pets } = await fetchPetsByCityUseCase.execute({
      cityId: notMatchId
    })

    expect(pets).toEqual([])
  })

  it('should be able to fetch pets using query', async () => {
    const organization = await organizationsRepository.create({
      email: 'org@example.com.br',
      password: '123456',
      name: 'Organization Name',
      owner_name: 'Organization Owner Name',
      zip_code: '00000-000',
      address: 'Organization Address',
      whatsapp: '00000000000',
      city: 'Acre'
    })

    const createdPet = await petsRepository.create({
      name: 'Pet example',
      description: 'Pet description',
      age: 1,
      size: 3,
      energy_level: 3,
      dependency_level: 2,
      environment: 'Ambiente amplo',
      organization_id: organization.id
    })

    const { pets } = await fetchPetsByCityUseCase.execute({
      cityId: 1,
      query: {
        age: 1,
        size: 3,
        energy_level: 3,
        dependency_level: 2
      }
    })

    expect(pets).toEqual([createdPet])
  })

  it('should be able to return empty pets if query does not match', async () => {
    const organization = await organizationsRepository.create({
      email: 'org@example.com.br',
      password: '123456',
      name: 'Organization Name',
      owner_name: 'Organization Owner Name',
      zip_code: '00000-000',
      address: 'Organization Address',
      whatsapp: '00000000000',
      city: 'Acre'
    })

    await petsRepository.create({
      name: 'Pet example',
      description: 'Pet description',
      age: 1,
      size: 3,
      energy_level: 2,
      dependency_level: 2,
      environment: 'Ambiente amplo',
      organization_id: organization.id
    })

    const { pets } = await fetchPetsByCityUseCase.execute({
      cityId: 1,
      query: {
        age: 2,
        size: 1,
        energy_level: 1,
        dependency_level: 1
      }
    })

    expect(pets).toEqual([])
  })
})
