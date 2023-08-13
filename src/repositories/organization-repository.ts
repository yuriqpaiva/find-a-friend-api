import { type Organization, type Prisma } from '@prisma/client'

export interface OrganizationRepository {
  create: (
    organization: Prisma.OrganizationCreateInput
  ) => Promise<Organization>
}
