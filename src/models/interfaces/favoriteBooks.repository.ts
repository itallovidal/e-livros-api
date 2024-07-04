import { IBook } from '../entities/IBook'

export interface IFavoriteBooksRepository {
  favoriteBook(bookID: string, id: string): Promise<void>
  unfavoriteBook(bookID: string, id: string): Promise<void>
  getFavoriteBook(bookID: string, userID: string): Promise<IBook | null>
  getAllFavoriteBooks(userID: string): Promise<IBook[] | null>
}

export const ISFavoriteBooksRepository = Symbol('IFavoriteBooksRepository')
