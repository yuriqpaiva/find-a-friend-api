import { type Organization, type Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  findById: (organizationId: number) => Promise<Organization | null>
  create: (
    organization: Prisma.OrganizationCreateInput
  ) => Promise<Organization>
}
