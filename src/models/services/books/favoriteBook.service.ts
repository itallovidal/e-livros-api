import { BadRequestException, Inject, Injectable } from '@nestjs/common'

import { IBookDTO } from '../../validations/bookDTO'
import {
  IFavoriteBooksRepository,
  ISFavoriteBooksRepository,
} from '../../repositories/favoriteBooks/favoriteBooks.repository'

@Injectable()
export class FavoriteBookService {
  constructor(
    @Inject(ISFavoriteBooksRepository)
    private favoriteBooksRepository: IFavoriteBooksRepository,
  ) {}

  async execute({ bookID }: IBookDTO, userID: string) {
    const bookAlreadyRegistered =
      await this.favoriteBooksRepository.getFavoriteBook(bookID, userID)

    if (bookAlreadyRegistered) {
      throw new BadRequestException({
        message: 'Book is already favorite.',
        status: 400,
        error: 'Bad Request',
      })
    }

    await this.favoriteBooksRepository.favoriteBook(bookID, userID)
  }
}
