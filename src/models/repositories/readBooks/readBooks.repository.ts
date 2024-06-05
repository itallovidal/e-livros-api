export interface IReadBooksRepository {
  readBook(bookID: string, userEmail: string): Promise<void>
  unreadBook(bookID: string, userEmail: string): Promise<void>
}

export const ISReadBooksRepository = Symbol('IReadBooksRepository')
