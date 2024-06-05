import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { IReadBooksRepository } from '../readBooks.repository'

@Injectable()
export class PrismaReadBooksRepository
  extends PrismaClient
  implements IReadBooksRepository
{
  private readonly prisma: PrismaClient
  constructor() {
    super({
      log: ['error', 'warn'],
    })
    this.prisma = new PrismaClient()
  }

  async readBook(bookID: string, userEmail: string) {
    console.log('bookID: ' + bookID)
    console.log('userID: ' + userEmail)

    await this.prisma.lidos.create({
      data: { book_id: bookID, user_id: userEmail },
    })
  }

  async unreadBook(bookID: string, userEmail: string) {
    await this.prisma.lidos.delete({
      where: {
        user_id: userEmail,
      },
    })
  }
}
