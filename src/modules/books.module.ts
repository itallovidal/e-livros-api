import { MiddlewareConsumer, Module } from '@nestjs/common'
import { UserAuth } from '../controllers/middlewares/user.auth'
import { FavoriteBookController } from '../controllers/books/favoriteBook.controller'

@Module({
  imports: [],
  controllers: [FavoriteBookController],
  providers: [],
})
export class BooksModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuth).forRoutes('books')
  }
}
