import { Inject, Injectable } from '@nestjs/common'
import { ICreateUser } from '../validation'
import { hash } from 'bcrypt'
import {
  ISUserRepository,
  IUsersRepository,
} from '../repositories/usersRepository'
@Injectable()
export class CreateUserService {
  constructor(
    @Inject(ISUserRepository) private usersRepository: IUsersRepository,
  ) {}

  async execute(user: ICreateUser) {
    const { password, ...data } = user
    const encryptedPassword = await hash(password, 5)

    const newUser = {
      ...data,
      password: encryptedPassword,
    }

    return this.usersRepository.createUser(newUser)
  }
}
