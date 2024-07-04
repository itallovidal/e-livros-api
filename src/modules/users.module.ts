import { MiddlewareConsumer, Module } from '@nestjs/common'
import { SignupController } from '../controllers/users/signup.controller'
import { SignupService } from '../services/users/signup.service'
import { ISUserRepository } from '../models/interfaces/users.repository'
import { PrismaUsersRepository } from '../DAOs/prismaUsersRepository'
import { LoginUserController } from '../controllers/users/login.controller'
import { LoginService } from '../services/users/login.service'
import { ProfileController } from '../controllers/users/profile.controller'
import { ProfileService } from '../services/users/profile.service'
import { ISFavoriteBooksRepository } from '../models/interfaces/favoriteBooks.repository'
import { PrismaFavoriteBooksRepository } from '../DAOs/prismaFavoriteBooksRepository'
import { ISReadBooksRepository } from '../models/interfaces/readBooks.repository'
import { PrismaReadBooksRepository } from '../DAOs/prismaReadBooksRepository'
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
