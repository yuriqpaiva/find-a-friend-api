import { type Organization } from '@prisma/client'
import { type OrganizationsRepository } from '../../../repositories/organizations-repository'
import { hash } from 'bcryptjs'

interface CreateOrganizationUseCaseRequest {
  email: string
  password: string
  name: string
  owner_name: string
  zip_code: string
  address: string
  whatsapp: string
  city: string
}

export class CreateOrganizationUseCase {
  constructor(
    private readonly organizationsRepository: OrganizationsRepository
  ) {}

  async execute(data: CreateOrganizationUseCaseRequest): Promise<Organization> {
    const password_hash = await hash(data.password, 6)

    const organization = await this.organizationsRepository.create({
      ...data,
      password: password_hash
    })
    return organization
  }
}
