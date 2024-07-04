import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { IBookDTO } from '../../models/validations/bookDTO'
import {
  IReadBooksRepository,
  ISReadBooksRepository,
} from '../../models/interfaces/readBooks.repository'

@Injectable()
export class UnReadBookService {
  constructor(
    @Inject(ISReadBooksRepository)
    private readBooksRepository: IReadBooksRepository,
  ) {}

  async execute({ bookID }: IBookDTO, userID: string) {
    const isBookValid = await this.readBooksRepository.getReadBook(
      bookID,
      userID,
    )

    if (!isBookValid) {
      throw new BadRequestException({
        message: 'Book is not in read list.',
        status: 400,
        error: 'Bad Request',
      })
    }

    await this.readBooksRepository.unreadBook(bookID, userID)
  }
}
