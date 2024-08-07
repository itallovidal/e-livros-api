import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { IReadBooksRepository } from '../models/interfaces/readBooks.repository'

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

  async getReadBook(bookID: string, userID: string) {
    console.log(bookID, userID)

    const book = await this.prisma.lidos.findFirst({
      where: {
        user_id: userID,
        book_id: bookID,
      },
    })

    return book
  }

  async readBook(bookID: string, id: string) {
    await this.prisma.lidos.create({
      data: { book_id: bookID, user_id: id },
    })
  }

  async getAllReadBooks(userID: string) {
    const books = await this.prisma.lidos.findMany({
      where: { user_id: userID },
    })

    return books
  }

  async unreadBook(bookID: string, id: string) {
    console.log(bookID)
    console.log(id)

    await this.prisma.lidos.deleteMany({
      where: { book_id: bookID, user_id: id },
    })
  }
}
