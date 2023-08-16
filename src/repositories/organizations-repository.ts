import { type Organization, type Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  findByEmail: (email: string) => Promise<Organization | null>
  findById: (organizationId: number) => Promise<Organization | null>
  create: (
    organization: Prisma.OrganizationCreateInput
  ) => Promise<Organization>
}
