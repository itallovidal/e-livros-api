import { MiddlewareConsumer, Module } from '@nestjs/common'
import { UserAuth } from '../controllers/middlewares/user.auth'
import { FavoriteBookController } from '../controllers/books/favoriteBook.controller'
import { ISFavoriteBooksRepository } from '../models/interfaces/favoriteBooks.repository'
import { PrismaFavoriteBooksRepository } from '../DAOs/prismaFavoriteBooksRepository'
import { FavoriteBookService } from '../services/books/favoriteBook.service'
import { UnFavoriteBookController } from '../controllers/books/unFavoriteBook.controller'
import { UnFavoriteBookService } from '../services/books/unFavoriteBook.service'
import { ReadBookController } from '../controllers/books/readBook.controller'
import { UnReadBookController } from '../controllers/books/unReadBook.controller'
import { ReadBookService } from '../services/books/readBook.service'
import { UnReadBookService } from '../services/books/unReadBook.service'
import { ISReadBooksRepository } from '../models/interfaces/readBooks.repository'
import { PrismaReadBooksRepository } from '../DAOs/prismaReadBooksRepository'
import { UsersBookInformationController } from '../controllers/books/usersBookInformation.controller'
import { UserBookInformationService } from '../services/books/userBookInformation.service'

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
