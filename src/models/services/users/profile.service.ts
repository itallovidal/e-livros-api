import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
  ISUserRepository,
  IUsersRepository,
} from '../../repositories/users/users.repository'
import {
  IReadBooksRepository,
  ISReadBooksRepository,
} from '../../repositories/readBooks/readBooks.repository'
import {
  IFavoriteBooksRepository,
  ISFavoriteBooksRepository,
} from '../../repositories/favoriteBooks/favoriteBooks.repository'

@Injectable()
export class ProfileService {
  constructor(
    @Inject(ISUserRepository) private usersRepository: IUsersRepository,
    @Inject(ISReadBooksRepository)
    private readBooksRepository: IReadBooksRepository,
    @Inject(ISFavoriteBooksRepository)
    private favoriteBooksRepository: IFavoriteBooksRepository,
  ) {}

  async execute(userID: string) {
    const user = await this.usersRepository.getUserByID(userID)

    if (!user) {
      throw new NotFoundException({
        message: 'User not found in the database.',
        field: 'token',
        status: 404,
        error: 'Not Found',
      })
    }

    const readBooks = await this.readBooksRepository.getAllReadBooks(userID)
    const favoriteBooks =
      await this.favoriteBooksRepository.getAllFavoriteBooks(userID)

    const { email, created_at: createdAt, name } = user

    return {
      user: {
        email,
        createdAt,
        name,
      },
      readBooks,
      favoriteBooks,
    }
  }
}
