import { type Organization } from '@prisma/client'
import { type OrganizationsRepository } from '../../../repositories/organizations-repository'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../../errors/invalid-credentials-error'

interface AuthenticateOrganizationRequest {
  email: string
  password: string
}

interface AuthenticateOrganizationResponse {
  organization: Organization
}

export class AuthenticateOrganizationUseCase {
  constructor(
    private readonly organizationsRepository: OrganizationsRepository
  ) {}

  async execute({
    email,
    password
  }: AuthenticateOrganizationRequest): Promise<AuthenticateOrganizationResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    // Compare the password provided with the password stored in the database
    const passwordMatched = await compare(password, organization.password)

    if (!passwordMatched) {
      throw new InvalidCredentialsError()
    }

    return {
      organization
    }
  }
}
