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

  async favoriteBook(bookID: string, userEmail: string) {
    console.log('bookID: ' + bookID)
    console.log('userID: ' + userEmail)

    await this.prisma.favoritos.create({
      data: { book_id: bookID, user_id: userEmail },
    })
  }

  async unfavoriteBook(bookID: string, userEmail: string) {
    await this.prisma.favoritos.delete({
      where: {
        user_id: userEmail,
      },
    })
  }
}
