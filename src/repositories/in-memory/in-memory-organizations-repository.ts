import { type Prisma, type Organization } from '@prisma/client'
import { type OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public readonly organizations: Organization[] = []

  async findByEmail(email: string): Promise<Organization | null> {
    return (
      this.organizations.find((organization) => organization.email === email) ??
      null
    )
  }

  async findById(organizationId: number): Promise<Organization | null> {
    const organization =
      this.organizations.find(
        (organization) => organization.id === organizationId
      ) ?? null

    return organization
  }

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
