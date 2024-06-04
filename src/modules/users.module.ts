import { Module } from '@nestjs/common'
import { SignupController } from '../controllers/users/signup.controller'
import { SignupService } from '../models/services/users/signup.service'
import { ISUserRepository } from '../models/repositories/users/users.repository'
import { PrismaUsersRepository } from '../models/repositories/users/implementations/prismaUsersRepository'
import { LoginUserController } from '../controllers/users/login.controller'
import { LoginService } from '../models/services/users/login.service'

@Module({
  imports: [],
  controllers: [SignupController, LoginUserController],
  providers: [
    SignupService,
    LoginService,
    {
      provide: ISUserRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}
