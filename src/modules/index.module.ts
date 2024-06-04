import { Module } from '@nestjs/common'
import { UsersModule } from './users.module'
import { BooksModule } from './books.module'

@Module({
  imports: [UsersModule, BooksModule],
})
export class AppModule {}
