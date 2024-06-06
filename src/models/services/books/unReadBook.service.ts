import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { IBookDTO } from '../../validations/bookDTO'
import {
  IReadBooksRepository,
  ISReadBooksRepository,
} from '../../repositories/readBooks/readBooks.repository'

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
