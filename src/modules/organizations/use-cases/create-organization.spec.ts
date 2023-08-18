import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrganizationsRepository } from '../../../repositories/in-memory/in-memory-organizations-repository'
import { CreateOrganizationUseCase } from './create-organization'
import { type OrganizationsRepository } from '../../../repositories/organizations-repository'

let organizationRepository: OrganizationsRepository
let createOrganizationUseCase: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    createOrganizationUseCase = new CreateOrganizationUseCase(
      organizationRepository
    )
  })

  it('should be able to create a new organization', async () => {
    const { organization } = await createOrganizationUseCase.execute({
      email: 'org@example.com.br',
      password: '123456',
      name: 'Organization Name',
      owner_name: 'Organization Owner Name',
      zip_code: '00000-000',
      address: 'Organization Address',
      whatsapp: '00000000000',
      city: 'Organization City'
    })

    expect(organization).toEqual(
      expect.objectContaining({
        id: expect.any(Number)
      })
    )
  })
})
