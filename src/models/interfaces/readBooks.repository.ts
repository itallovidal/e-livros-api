import { IBook } from '../entities/IBook'

export interface IReadBooksRepository {
  readBook(bookID: string, id: string): Promise<void>
  unreadBook(bookID: string, id: string): Promise<void>
  getReadBook(bookID: string, id: string): Promise<IBook | null>
  getAllReadBooks(userID: string): Promise<IBook[] | null>
}

export const ISReadBooksRepository = Symbol('IReadBooksRepository')
