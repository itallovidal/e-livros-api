import { MiddlewareConsumer, Module } from '@nestjs/common'
import { UserAuth } from '../controllers/middlewares/user.auth'
import { FavoriteBookController } from '../controllers/books/favoriteBook.controller'
import { ISFavoriteBooksRepository } from '../models/repositories/favoriteBooks/favoriteBooks.repository'
import { PrismaFavoriteBooksRepository } from '../models/repositories/favoriteBooks/implementations/prismaFavoriteBooksRepository'
import { FavoriteBookService } from '../models/services/books/favoriteBook.service'
import { UnFavoriteBookController } from '../controllers/books/unFavoriteBook.controller'
import { UnFavoriteBookService } from '../models/services/books/unFavoriteBook.service'
import { ReadBookController } from '../controllers/books/readBook.controller'
import { UnReadBookController } from '../controllers/books/unReadBook.controller'
import { ReadBookService } from '../models/services/books/readBook.service'
import { UnReadBookService } from '../models/services/books/unReadBook.service'
import { ISReadBooksRepository } from '../models/repositories/readBooks/readBooks.repository'
import { PrismaReadBooksRepository } from '../models/repositories/readBooks/implementations/prismaReadBooksRepository'
import { UsersBookInformationController } from '../controllers/books/usersBookInformation.controller'
import { UserBookInformationService } from '../models/services/books/userBookInformation.service'

@Module({
  imports: [],
  controllers: [
    FavoriteBookController,
    UnFavoriteBookController,
    ReadBookController,
    UnReadBookController,
    UsersBookInformationController,
  ],
  providers: [
    FavoriteBookService,
    UnFavoriteBookService,
    ReadBookService,
    UnReadBookService,
    UserBookInformationService,
    {
      provide: ISFavoriteBooksRepository,
      useClass: PrismaFavoriteBooksRepository,
    },
    {
      provide: ISReadBooksRepository,
      useClass: PrismaReadBooksRepository,
    },
  ],
})
export class BooksModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuth).forRoutes('books')
  }
}
