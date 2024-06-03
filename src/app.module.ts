import { Module } from '@nestjs/common'
import { CreateUserController } from './controllers/app.controller'
import { CreateUserService } from './models/services/createUserService'
import { ISUserRepository } from './models/repositories/usersRepository'
import { PrismaUsersRepository } from './models/repositories/implementations/prismaUsersRepository'

@Module({
  imports: [],
  controllers: [CreateUserController],
  providers: [
    CreateUserService,
    {
      provide: ISUserRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class AppModule {}
