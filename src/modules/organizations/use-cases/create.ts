import { type Organization } from '@prisma/client'
import { type OrganizationRepository } from '../../../repositories/organization-repository'

interface CreateOrganizationRequest {
  email: string
  password: string
  name: string
  owner_name: string
  zip_code: string
  address: string
  whatsapp: string
  phone: string
}

export class CreateOrganizationUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository
  ) {}

  async execute(data: CreateOrganizationRequest): Promise<Organization> {
    const organization = await this.organizationRepository.create(data)
    return organization
  }
}
