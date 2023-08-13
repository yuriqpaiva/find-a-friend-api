import { type Prisma, type Organization } from '@prisma/client'
import { type OrganizationRepository } from '../organization-repository'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  private readonly organizations: Organization[] = []

  async create(
    organization: Prisma.OrganizationCreateInput
  ): Promise<Organization> {
    const newOrganization: Organization = {
      ...organization,
      id: this.organizations.length + 1,
      created_at: new Date()
    }
    this.organizations.push(newOrganization)
    return newOrganization
  }
}
