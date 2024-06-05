import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { IUsersRepository } from '../users.repository'
import { ISignupSchemaDTO } from '../../../validations/signupSchemaDTO'

@Injectable()
export class PrismaUsersRepository
  extends PrismaClient
  implements IUsersRepository
{
  private readonly prisma: PrismaClient
  constructor() {
    super({
      log: ['error', 'warn'],
    })

    this.prisma = new PrismaClient()
  }

  async createUser(user: ISignupSchemaDTO) {
    await this.prisma.usuarios.create({ data: user })
  }

  async getUserByEmail(email: string): Promise<any> {
    const user = await this.prisma.usuarios.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
