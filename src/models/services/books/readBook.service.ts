import { BadRequestException, Inject, Injectable } from '@nestjs/common'

import { IBookDTO } from '../../validations/bookDTO'
import {
  IReadBooksRepository,
  ISReadBooksRepository,
} from '../../repositories/readBooks/readBooks.repository'

@Injectable()
export class ReadBookService {
  constructor(
    @Inject(ISReadBooksRepository)
    private readBooksRepository: IReadBooksRepository,
  ) {}

  async execute({ bookID }: IBookDTO, userID: string) {
    const bookAlreadyRegistered = await this.readBooksRepository.getReadBook(
      bookID,
      userID,
    )

    if (bookAlreadyRegistered) {
      throw new BadRequestException({
        message: 'Book is already read.',
        status: 400,
        error: 'Bad Request',
      })
    }

    await this.readBooksRepository.readBook(bookID, userID)
  }
}
