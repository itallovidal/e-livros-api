import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { IUsersRepository } from '../models/repositories/users.repository'
import { ISignupSchemaDTO } from '../models/validations/signupSchemaDTO'
import { IUserDAO } from '../models/entities/IUser.dao'

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

  async getUserByEmail(email: string): Promise<IUserDAO | null> {
    const user = await this.prisma.usuarios.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async getUserByID(userID: string): Promise<IUserDAO | null> {
    const user = await this.prisma.usuarios.findUnique({
      where: {
        id: userID,
      },
    })

    return user
  }
}
