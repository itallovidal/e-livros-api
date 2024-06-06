import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { IFavoriteBooksRepository } from '../favoriteBooks.repository'

@Injectable()
export class PrismaFavoriteBooksRepository
  extends PrismaClient
  implements IFavoriteBooksRepository
{
  private readonly prisma: PrismaClient
  constructor() {
    super({
      log: ['error', 'warn'],
    })
    this.prisma = new PrismaClient()
  }

  async getFavoriteBook(bookID: string, userID: string) {
    console.log(bookID, userID)

    const book = await this.prisma.favoritos.findFirst({
      where: {
        user_id: userID,
        book_id: bookID,
      },
    })

    return book
  }

  async favoriteBook(bookID: string, id: string) {
    await this.prisma.favoritos.create({
      data: { book_id: bookID, user_id: id },
    })
  }

  async unfavoriteBook(bookID: string, id: string) {
    await this.prisma.favoritos.deleteMany({
      where: { book_id: bookID, user_id: id },
    })
  }
}
