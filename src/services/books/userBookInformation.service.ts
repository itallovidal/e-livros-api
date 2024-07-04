import { Inject, Injectable } from '@nestjs/common'

import { IBookDTO } from '../../models/validations/bookDTO'
import {
  IReadBooksRepository,
  ISReadBooksRepository,
} from '../../models/repositories/readBooks.repository'
import {
  IFavoriteBooksRepository,
  ISFavoriteBooksRepository,
} from '../../models/repositories/favoriteBooks.repository'

@Injectable()
export class UserBookInformationService {
  constructor(
    @Inject(ISReadBooksRepository)
    private readBooksRepository: IReadBooksRepository,
    @Inject(ISFavoriteBooksRepository)
    private favoriteBooksRepository: IFavoriteBooksRepository,
  ) {}

  async execute({ bookID }: IBookDTO, userID: string) {
    const isRead = await this.readBooksRepository.getReadBook(bookID, userID)
    const isFavorite = await this.favoriteBooksRepository.getFavoriteBook(
      bookID,
      userID,
    )

    console.log(isFavorite)
    console.log(isRead)

    return {
      bookID,
      isRead: !!isRead,
      isFavorite: !!isFavorite,
    }
  }
}
