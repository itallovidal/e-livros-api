import { IBookDAO } from '../../entities/IBookDAO'

export interface IReadBooksRepository {
  readBook(bookID: string, id: string): Promise<void>
  unreadBook(bookID: string, id: string): Promise<void>
  getReadBook(bookID: string, id: string): Promise<IBookDAO | null>
}

export const ISReadBooksRepository = Symbol('IReadBooksRepository')
