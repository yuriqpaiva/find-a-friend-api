import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrganizationRepository } from '../../../repositories/in-memory/in-memory-organization-repository'
import { CreateOrganizationUseCase } from './create'
import { type OrganizationRepository } from '../../../repositories/organization-repository'

let organizationRepository: OrganizationRepository
let createOrganizationUseCase: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    createOrganizationUseCase = new CreateOrganizationUseCase(
      organizationRepository
    )
  })

  it('should be able to create a new organization', async () => {
    const createdOrganization = await createOrganizationUseCase.execute({
      email: 'org@example.com.br',
      password: '123456',
      name: 'Organization Name',
      owner_name: 'Organization Owner Name',
      zip_code: '00000-000',
      address: 'Organization Address',
      whatsapp: '00000000000',
      phone: '00000000000'
    })

    expect(createdOrganization).toEqual(
      expect.objectContaining({
        id: expect.any(Number)
      })
    )
  })
})
