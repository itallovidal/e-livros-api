import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
  ISUserRepository,
  IUsersRepository,
} from '../../models/repositories/users.repository'
import {
  IReadBooksRepository,
  ISReadBooksRepository,
} from '../../models/repositories/readBooks.repository'
import {
  IFavoriteBooksRepository,
  ISFavoriteBooksRepository,
} from '../../models/repositories/favoriteBooks.repository'

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
