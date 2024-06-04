import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { IUsersRepository } from '../usersRepository'
import { ICreateUser } from '../../validation'

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

  async createUser(user: ICreateUser) {
    await this.prisma.user.create({ data: user })
  }

  async getUserByEmail(email: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
