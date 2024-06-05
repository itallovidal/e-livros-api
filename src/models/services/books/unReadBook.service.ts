import { Inject, Injectable } from '@nestjs/common'
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

  async execute({ bookID }: IBookDTO, email: string) {
    await this.readBooksRepository.unreadBook(bookID, email)
  }
}
