import { Module } from '@nestjs/common'
import { CreateUserController } from './controllers/createUser.controller'
import { CreateUserService } from './models/services/createUser.service'
import { ISUserRepository } from './models/repositories/usersRepository'
import { PrismaUsersRepository } from './models/repositories/implementations/prismaUsersRepository'
import { LoginUserController } from './controllers/login.controller'
import { LoginUserService } from './models/services/loginUser.service'

@Module({
  imports: [],
  controllers: [CreateUserController, LoginUserController],
  providers: [
    CreateUserService,
    LoginUserService,
    {
      provide: ISUserRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class AppModule {}
