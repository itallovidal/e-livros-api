export interface IFavoriteBooksRepository {
  favoriteBook(bookID: string, id: string): Promise<void>
  unfavoriteBook(bookID: string, id: string): Promise<void>
  getFavoriteBook(bookID: string, userID: string): Promise<any>
}

export const ISFavoriteBooksRepository = Symbol('IFavoriteBooksRepository')
