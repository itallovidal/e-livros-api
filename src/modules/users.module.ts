import { MiddlewareConsumer, Module } from '@nestjs/common'
import { SignupController } from '../controllers/users/signup.controller'
import { SignupService } from '../models/services/users/signup.service'
import { ISUserRepository } from '../models/repositories/users/users.repository'
import { PrismaUsersRepository } from '../models/repositories/users/implementations/prismaUsersRepository'
import { LoginUserController } from '../controllers/users/login.controller'
import { LoginService } from '../models/services/users/login.service'
import { ProfileController } from '../controllers/users/profile.controller'
import { ProfileService } from '../models/services/users/profile.service'
import { ISFavoriteBooksRepository } from '../models/repositories/favoriteBooks/favoriteBooks.repository'
import { PrismaFavoriteBooksRepository } from '../models/repositories/favoriteBooks/implementations/prismaFavoriteBooksRepository'
import { ISReadBooksRepository } from '../models/repositories/readBooks/readBooks.repository'
import { PrismaReadBooksRepository } from '../models/repositories/readBooks/implementations/prismaReadBooksRepository'
import { UserAuth } from '../controllers/middlewares/user.auth'

@Module({
  imports: [],
  controllers: [SignupController, LoginUserController, ProfileController],
  providers: [
    SignupService,
    LoginService,
    ProfileService,
    {
      provide: ISUserRepository,
      useClass: PrismaUsersRepository,
    },
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
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuth).forRoutes(ProfileController)
  }
}
