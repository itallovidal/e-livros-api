export interface IFavoriteBooksRepository {
  favoriteBook(bookID: string, userEmail: string): Promise<void>
  unfavoriteBook(bookID: string, userEmail: string): Promise<void>
}

export const ISFavoriteBooksRepository = Symbol('IFavoriteBooksRepository')
