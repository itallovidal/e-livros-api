import { BadRequestException, Inject, Injectable } from '@nestjs/common'

import { IBookDTO } from '../../models/validations/bookDTO'
import {
  IReadBooksRepository,
  ISReadBooksRepository,
} from '../../models/repositories/readBooks.repository'

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
