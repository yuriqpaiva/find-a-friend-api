import { type Organization, type Prisma } from '@prisma/client'
import { type OrganizationsRepository } from '../organizations-repository'
import { prisma } from '../../lib/prisma'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findByEmail(email: string): Promise<Organization | null> {
    return await prisma.organization.findUnique({
      where: { email }
    })
  }

  async findById(organizationId: number): Promise<Organization | null> {
    return await prisma.organization.findUnique({
      where: { id: organizationId }
    })
  }

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    return await prisma.organization.create({ data })
  }
}
