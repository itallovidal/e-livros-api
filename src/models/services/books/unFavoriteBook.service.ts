import { Inject, Injectable } from '@nestjs/common'

import { IBookDTO } from '../../validations/bookDTO'
import {
  IFavoriteBooksRepository,
  ISFavoriteBooksRepository,
} from '../../repositories/favoriteBooks/favoriteBooks.repository'

@Injectable()
export class UnFavoriteBookService {
  constructor(
    @Inject(ISFavoriteBooksRepository)
    private favoriteBooksRepository: IFavoriteBooksRepository,
  ) {}

  async execute({ bookID }: IBookDTO, email: string) {
    await this.favoriteBooksRepository.unfavoriteBook(bookID, email)
  }
}
