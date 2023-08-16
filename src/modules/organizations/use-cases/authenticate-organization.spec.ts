import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrganizationsRepository } from '../../../repositories/in-memory/in-memory-organizations-repository'
import { type OrganizationsRepository } from '../../../repositories/organizations-repository'
import { AuthenticateOrganizationUseCase } from './authenticate-organization'
import { hash } from 'bcryptjs'

let organizationRepository: OrganizationsRepository
let authenticateOrganizationUseCase: AuthenticateOrganizationUseCase

describe('Authenticate Organization Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    authenticateOrganizationUseCase = new AuthenticateOrganizationUseCase(
      organizationRepository
    )
  })

  it('should be able to authenticate an organization', async () => {
    await organizationRepository.create({
      email: 'org@example.com.br',
      password: await hash('123456', 6),
      name: 'Organization Name',
      owner_name: 'Organization Owner Name',
      zip_code: '00000-000',
      address: 'Organization Address',
      whatsapp: '00000000000',
      phone: '00000000000',
      city: 'Organization City'
    })

    const { organization } = await authenticateOrganizationUseCase.execute({
      email: 'org@example.com.br',
      password: '123456'
    })

    expect(organization).toEqual(
      expect.objectContaining({
        id: expect.any(Number)
      })
    )
  })
})
