export interface IReadBooksRepository {
  readBook(bookID: string, id: string): Promise<void>
  unreadBook(bookID: string, id: string): Promise<void>
  getReadBook(bookID: string, id: string): Promise<any>
}

export const ISReadBooksRepository = Symbol('IReadBooksRepository')
