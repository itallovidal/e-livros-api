import { BadRequestException, Inject, Injectable } from '@nestjs/common'

import { IBookDTO } from '../../models/validations/bookDTO'
import {
  IFavoriteBooksRepository,
  ISFavoriteBooksRepository,
} from '../../models/repositories/favoriteBooks.repository'

@Injectable()
export class UnFavoriteBookService {
  constructor(
    @Inject(ISFavoriteBooksRepository)
    private favoriteBooksRepository: IFavoriteBooksRepository,
  ) {}

  async execute({ bookID }: IBookDTO, userID: string) {
    const isBookValid = await this.favoriteBooksRepository.getFavoriteBook(
      bookID,
      userID,
    )

    if (!isBookValid) {
      throw new BadRequestException({
        message: 'Book is not in favorite list.',
        status: 400,
        error: 'Bad Request',
      })
    }

    await this.favoriteBooksRepository.unfavoriteBook(bookID, userID)
  }
}
