import { type Organization } from '@prisma/client'
import { type OrganizationsRepository } from '../../../repositories/organizations-repository'

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
    private readonly organizationsRepository: OrganizationsRepository
  ) {}

  async execute(data: CreateOrganizationRequest): Promise<Organization> {
    const organization = await this.organizationsRepository.create(data)
    return organization
  }
}
