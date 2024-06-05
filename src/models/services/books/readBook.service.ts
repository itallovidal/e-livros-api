import { Inject, Injectable } from '@nestjs/common'

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

  async execute({ bookID }: IBookDTO, id: string) {
    await this.readBooksRepository.readBook(bookID, id)
  }
}
