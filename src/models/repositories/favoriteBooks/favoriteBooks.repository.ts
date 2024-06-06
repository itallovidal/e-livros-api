import { IBookDAO } from '../../entities/IBookDAO'

export interface IFavoriteBooksRepository {
  favoriteBook(bookID: string, id: string): Promise<void>
  unfavoriteBook(bookID: string, id: string): Promise<void>
  getFavoriteBook(bookID: string, userID: string): Promise<IBookDAO | null>
}

export const ISFavoriteBooksRepository = Symbol('IFavoriteBooksRepository')
