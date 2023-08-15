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
      phone: '00000000000',
      city: 'São Paulo'
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

    const pets = await fetchPetsByCityUseCase.execute({
      city: 'São Paulo'
    })

    expect(pets).toEqual([firstPet, secondPet])
  })

  it('should be able to return an empty array if no pets are found', async () => {
    const organization = await organizationsRepository.create({
      email: 'org@example.com.br',
      password: '123456',
      name: 'Organization Name',
      owner_name: 'Organization Owner Name',
      zip_code: '00000-000',
      address: 'Organization Address',
      whatsapp: '00000000000',
      phone: '00000000000',
      city: 'São Paulo'
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

    const pets = await fetchPetsByCityUseCase.execute({
      city: 'Rio de Janeiro'
    })

    expect(pets).toEqual([])
  })
})
